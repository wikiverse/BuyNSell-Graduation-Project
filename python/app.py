from nltk.corpus import wordnet
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo_uri = "mongodb://127.0.0.1:27017/buynsell"
client = MongoClient(mongo_uri)
db = client['buynsell']


@app.get("/recommendations/<prod_id>")
@cross_origin()
def get_recommendations_products(prod_id):
    cursor = db['products'].find("")
    metadata = pd.DataFrame(list(cursor))
    metadata['_id'] = metadata['_id'].astype('string')
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(metadata['description'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    indexes = pd.Series(
        metadata.index, index=metadata['_id'])

    idx = indexes[prod_id]

    similarity_scores = list(enumerate(cosine_similarities[idx]))

    similarity_scores = sorted(
        similarity_scores, key=lambda x: x[1], reverse=True)

    similarity_scores = similarity_scores[1:4]

    product_indexes = [i[0] for i in similarity_scores]

    result = metadata[['_id', 'title', 'imageUrl', 'price']
                      ].iloc[product_indexes]

    print(result)
    return result.to_json(orient="records")


@app.post("/smart-match")
@cross_origin()
def get_smart_match():

    # Get body data from the requested JSON
    data = request.get_json(force=True)

    # Print the description from the data
    print(data['description'])

    # Put the description into a set of string to retrieve
    # unique elements
    string_arr = set(data['description'].split(" "))

    # List for storing synonyms
    synonyms = []

    # For each unique word in the description, get synonyms
    for word in string_arr:
        for syn in wordnet.synsets(word):
            # Extracting lemmas
            for lm in syn.lemmas():
                synonyms.append(lm.name())
    # Remove duplicate synonyms
    print(set(synonyms))

    # Update the description string list with the new synonyms
    # Duplicates will be removed
    string_arr.update(synonyms)

    # Convert the set into a string
    data['description'] = " ".join(string_arr)

    # Set the input description's _id as '0' to retrieve later
    d = {"_id": "0"}
    d['description'] = data['description']
    d['title'] = data['description']

    # Get metadata from the database
    cursor = db['products'].find("")
    metadata = pd.DataFrame(list(cursor))
    metadata['_id'] = metadata['_id'].astype('string')

    # Append the description to the list of metadata
    metadata = metadata.append(d, ignore_index=True)

    # Add titles to descriptions
    metadata['description'] = metadata['title'] + ' ' + metadata['description']
    print(metadata['description'])

    # Construct Tfidf with stop_words
    tfidf = TfidfVectorizer(stop_words='english')

    # Construct TF-IDF matrix to calculate cosine similarity score
    # for each description that correlates to all the other descriptions
    tfidf_matrix = tfidf.fit_transform(metadata['description'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Make indices based on _id to retrieve elements by their _id
    indexes = pd.Series(
        metadata.index, index=metadata['_id'])

    # Retrieve the index of the product by product _id
    idx = indexes['0']

    # Get cosine similarity scores of all the other products
    # correlated to the retrieving product
    similarity_scores = list(enumerate(cosine_similarities[idx]))

    # Sort the list based on the highest score
    similarity_scores = sorted(
        similarity_scores, key=lambda x: x[1], reverse=True)

    # Retrieve the highest 3 cosine similarity scores
    similarity_scores = similarity_scores[1:4]

    # Retrieve product indexes for each cosine similarity scores
    product_indexes = [i[0] for i in similarity_scores]

    # Retrieve the products' _id, title, imageUrl, and price for each
    # index retrieved by the indexes
    result = metadata[['_id', 'title', 'imageUrl', 'price']
                      ].iloc[product_indexes]

    print(result)
    # Convert the result to JSON and send it back
    return result.to_json(orient="records")

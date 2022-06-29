import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProduct } from '../API/User';
import List from '../Components/List';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(searchProduct + '?query=' + query, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data);
      });
  }, [query]);
  return (
    <>
      {!products.length && `No results for "${query}"`}
      {products.map((product) => {
        return (
          <List
            key={product._id}
            id={product._id}
            fullname={product.author.fullName}
            imageUrl={product.imageUrl}
            imgUrl={product.author.imgUrl}
            title={product.title}
            price={product.price}
            date={product.date}
            isNegotiable={product.isNegotiable}
          />
        );
      })}
    </>
  );
};

export default Search;

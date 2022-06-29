import { useEffect, useState } from 'react';
import { allProducts, recommendedProducts } from '../API/User';
import List from '../Components/List';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  useEffect(() => {
    fetch(allProducts, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div style={{ width: '100%', maxWidth: '600px', marginTop: '10px' }}>
        {/* <label htmlFor="interest">Recommendation or recent: </label>
        <select onChange={selectHandler} name="Interests" id="interest">
          <option value="recent">Recent</option>
          <option value="recommendation">Recommendation</option>
        </select> */}

        <Button
          style={{
            background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
            margin: '10px 0 ',
          }}
          onClick={() => {
            navigate('/match');
          }}
        >
          Smart Match
        </Button>
      </div>
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

export default Home;

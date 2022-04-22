import { useEffect, useState } from 'react';
import { allProducts } from '../API/User';
import List from '../Components/List';

const Home = () => {
  const [products, setProducts] = useState([]);
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

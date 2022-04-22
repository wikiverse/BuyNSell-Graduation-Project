import React from 'react';
import { Link } from 'react-router-dom';
import classes from './List.module.css';

const List = (props) => {
  const date = new Date(props.date);
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.top}>
          <div className={classes.img}>
            <img
              style={{ height: 'inherit' }}
              src={props.imgUrl}
              alt="Product"
            />
          </div>
          <div>
            <div>{props.fullname}</div>
            <div>
              {date.toLocaleString('default', { month: 'long' })}{' '}
              {date.getDate()}
            </div>
          </div>
        </div>
        <div className={classes['product-image']}>
          <img src={props.imageUrl} alt="Product" />
        </div>
      </div>
      <div className={classes.right}>
        <Link
          style={{ textDecoration: 'none', color: '#000000' }}
          to={`/posts/${props.id}`}
        >
          <span className={classes.title}>{props.title}</span>
        </Link>
        <div>
          <span className={classes.price}>
            ₩{props.price.toLocaleString()}{' '}
            {props.isNegotiable === true && '(Negotiable)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default List;

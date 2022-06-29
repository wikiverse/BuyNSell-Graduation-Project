import { Link } from 'react-router-dom';
import classes from './RecommendedItems.module.css';

const RecommendedItems = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <img
          style={{ width: '70px', height: '70px', objectFit: 'contain' }}
          src={props.imgUrl}
        />
      </div>
      <div className={classes.right}>
        <div>
          <Link
            style={{ textDecoration: 'none', color: '#000000' }}
            to={`/posts/${props.id}`}
          >
            <span>{props.title}</span>
          </Link>
        </div>
        <div>
          <span>₩{props.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItems;

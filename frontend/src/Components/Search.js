import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={classes.container}>
      <div className={classes['input-container']}>
        <input
          onChange={(event) => {
            console.log(event.target.value);
            setSearchQuery(event.target.value);
          }}
          className={classes.input}
        ></input>
      </div>
      <div
        onClick={() => {
          navigate(`/search/?query=${searchQuery}`);
        }}
        className={classes.icon}
      >
        <span>
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default Search;

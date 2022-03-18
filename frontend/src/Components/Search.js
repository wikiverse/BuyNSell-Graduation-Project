import classes from './Search.module.css';

const Search = () => {
  return (
    <div className={classes.container}>
      <div className={classes['input-container']}>
        <input className={classes.input}></input>
      </div>
      <div className={classes.icon}>
        <span>
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default Search;

import classes from './Description.module.css';

const Description = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.label}>
        <label>Description</label>
      </div>
      <div className={classes['text-div']}>
        <textarea
          className={classes.text}
          value={props.value}
          onChange={props.onChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Description;
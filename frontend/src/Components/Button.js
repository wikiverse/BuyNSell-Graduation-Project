import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className={classes.container}
    >
      <span className={classes.text}>{props.children}</span>
    </button>
  );
};

export default Button;

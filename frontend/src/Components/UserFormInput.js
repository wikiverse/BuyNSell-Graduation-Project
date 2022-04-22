import { useState } from 'react';
import classes from './UserFormInput.module.css';

const UserFormInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={classes.container}>
      <div>
        <label>
          <span className={classes['label-span']}>{props.label}</span>
        </label>
      </div>
      <div
        className={`${classes['input-container']} ${
          isFocused && classes['input-container-focus']
        }`}
      >
        <input
          readOnly={props.readOnly}
          type={props.type}
          className={classes.input}
          value={props.value}
          placeholder={props.placeholder}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={props.onChange}
        ></input>
      </div>
      <div className={classes.message}>
        <span className={`${classes['message-text']}`}>{props.message}</span>
      </div>
    </div>
  );
};

export default UserFormInput;

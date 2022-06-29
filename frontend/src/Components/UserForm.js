import React from 'react';
import classes from './UserForm.module.css';

const UserForm = (props) => {
  return (
    <div style={props.style} className={classes.container}>
      <div style={{ margin: '20px 0' }}>
        <span className={classes.title}>{props.title}</span>
      </div>
      {props.children}
    </div>
  );
};

export default UserForm;

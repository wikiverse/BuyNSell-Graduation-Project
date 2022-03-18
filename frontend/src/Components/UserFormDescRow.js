import classes from './UserFormDescRow.module.css';

const UserFormDescRow = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.left}>
          <i
            style={{ fontSize: '1.7rem', color: 'green' }}
            className="bi bi-check2-circle"
          ></i>
        </div>
        <div className={classes.right}>
          <span className={classes.title}>{props.content.title}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={classes.left}></div>
        <div className={classes.right}>
          <span>{props.content.description}</span>
        </div>
      </div>
    </div>
  );
};

export default UserFormDescRow;

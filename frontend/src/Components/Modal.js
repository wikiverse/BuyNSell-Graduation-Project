import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import Card from './Card';
const Background = (props) => {
  return (
    <div className={classes.background} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const Overlay = (props) => {
  return (
    <Background onClick={props.onClick}>
      <Card style={props.style} className={classes.modal}>
        {props.children}
      </Card>
    </Background>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay onClick={props.onClick} style={props.style}>
          {props.children}
        </Overlay>,
        document.getElementById('modal')
      )}
    </>
  );
};

export default Modal;

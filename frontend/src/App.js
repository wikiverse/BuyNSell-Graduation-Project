import { Outlet, useNavigate, Link } from 'react-router-dom';
import Button from './Components/Button';
import Search from './Components/Search';
import classes from './App.module.css';
import { IsAuthenticated } from './API/Middleware';
import { signOutUrl } from './API/User';
import { SocketContext } from './Routes/Context';
import Modal from './Components/Modal';
import { useContext } from 'react';

const App = () => {
  const navigate = useNavigate();
  IsAuthenticated();
  const { callee, isReceiving, setIsReceiving } = useContext(SocketContext);
  const callHandler = () => {
    setIsReceiving(false);
    navigate(`/call/?peerId=${callee.peerId}`);
  };
  return (
    <>
      {isReceiving && (
        <Modal>
          <div>{callee.name} is calling.</div>
          <Button onClick={callHandler}>Accept</Button>
        </Modal>
      )}
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <nav className={classes.desktop}>
            <div style={{ width: 'auto', margin: '0 20px' }}>
              <Link to="/">
                <span
                  style={{
                    fontFamily: 'Pacifico',
                    fontSize: '1.5rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Buy&#38;Sell
                </span>
              </Link>
            </div>
            <div className={classes.search}>
              <Search />
            </div>
            <div className={classes.buttons}>
              <Button
                onClick={() => {
                  navigate('/post');
                }}
                className={classes.button}
                style={{ margin: '0 10px', background: '#FFB703' }}
              >
                Sell
              </Button>
              <Button
                onClick={() => {
                  navigate('/mypage');
                }}
                className={classes.button}
              >
                My page
              </Button>
              <Button
                onClick={() => {
                  fetch(signOutUrl, {
                    method: 'POST',
                    credentials: 'include',
                  });
                  window.location.href = '/';
                }}
                className={classes.button}
                style={{ margin: '0 10px', background: '#e63946' }}
              >
                Sign out
              </Button>
            </div>
          </nav>
        </div>
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;

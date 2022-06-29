import { Outlet, useNavigate, Link } from 'react-router-dom';
import Button from './Components/Button';
import Search from './Components/Search';
import classes from './App.module.css';
import { IsAuthenticated } from './API/Middleware';
import { signOutUrl } from './API/User';
import { SocketContext } from './Routes/Context';
import Modal from './Components/Modal';
import { useContext, useEffect, useState } from 'react';
import { userInfoUrl } from './API/User';

const App = () => {
  const navigate = useNavigate();
  IsAuthenticated();
  const { callee, isReceiving, setIsReceiving } = useContext(SocketContext);
  const [callerInfo, setCallerInfo] = useState({});
  const callHandler = () => {
    setIsReceiving(false);
    navigate(`/call/?peerId=${callee.peerId}`);
  };
  useEffect(() => {
    fetch(userInfoUrl + callee.caller, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCallerInfo(response);
      });
  }, [callee.caller]);
  return (
    <>
      {isReceiving && (
        <Modal>
          <div
            style={{ width: '400px' }}
            className={classes['modal-container']}
          >
            <div className={classes['modal-div-img']}>
              <img
                style={{ height: '200px' }}
                src={callerInfo.imageUrl}
                alt="caller"
              />
            </div>
            <div>{callerInfo.fullname} is calling.</div>
            <Button onClick={callHandler}>Accept</Button>
          </div>
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

import { Outlet } from 'react-router-dom';
import Button from './Components/Button';
import Search from './Components/Search';
import classes from './App.module.css';
import { IsAuthenticated } from './API/Middleware';

const App = () => {
  IsAuthenticated();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <nav className={classes.desktop}>
          <div style={{ width: 'auto', margin: '0 20px' }}>
            <span
              style={{
                fontFamily: 'Pacifico',
                fontSize: '1.5rem',
                color: 'white',
              }}
            >
              Buy&#38;Sell
            </span>
          </div>
          <div className={classes.search}>
            <Search />
          </div>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              style={{ margin: '0 10px', background: '#FFB703' }}
            >
              Sell
            </Button>
            <Button className={classes.button}>My page</Button>
            <Button
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
  );
};

export default App;

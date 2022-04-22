import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import Button from '../Components/Button';
import Footer from '../Components/Footer';
import { signInUrl } from '../API/User';
import Modal from '../Components/Modal';
import { IsSignedIn } from '../API/Middleware';
import classes from './SignIn.module.css';
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  IsSignedIn();
  const setIsErrorHandler = () => {
    setIsError(false);
  };
  const setUsernameHandler = (event) => {
    setUsernameMessage('');
    setUsername(event.target.value.trim());
  };
  const setPasswordHandler = (event) => {
    setPasswordMessage('');
    setPassword(event.target.value.trim());
  };
  const isValidUsername = () => {
    if (!username) {
      setUsernameMessage('Please enter your username.');
      return false;
    }
    return true;
  };

  const isValidPassword = () => {
    if (!password) {
      setPasswordMessage('Please enter your password.');
      return false;
    }
    return true;
  };
  const signInHandler = async () => {
    const isValidForm = {
      isValidUsername: isValidUsername(),
      isValidPassword: isValidPassword(),
    };

    if (!isValidForm.isValidUsername || !isValidForm.isValidPassword) return;
    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(signInUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.status !== 200) {
        setIsError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isError && (
        <Modal onClick={setIsErrorHandler}>
          <div className={classes['modal-title']}>
            <span>Invalid authorization</span>
          </div>
          <div className={classes['modal-description']}>
            <span style={{ display: 'block' }}>
              You sign in attempt has been insuccessful.
            </span>
            <span style={{ display: 'block' }}>
              Either your username or password is wrong.
            </span>
          </div>
          <div style={{ width: '100%' }}>
            <Button>Try again</Button>
          </div>
        </Modal>
      )}
      <div className={classes.container}>
        <UserForm title="Sign in to your account">
          <UserFormInput
            value={username}
            onChange={setUsernameHandler}
            label="Username"
            message={usernameMessage}
          />
          <UserFormInput
            type="password"
            value={password}
            onChange={setPasswordHandler}
            label="Password"
            message={passwordMessage}
          />

          <Button onClick={signInHandler}>Sign in</Button>

          <div style={{ margin: '10px 0' }}>
            <span style={{ fontSize: '0.9rem' }}>
              Haven't signed up?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Sign up
              </Link>
            </span>
          </div>
          <div style={{ margin: '10px 0' }}>
            <span style={{ fontSize: '0.9rem' }}>
              Forgot password?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Reset
              </Link>
            </span>
          </div>
        </UserForm>
        <Footer />
      </div>
    </>
  );
};

export default SignIn;

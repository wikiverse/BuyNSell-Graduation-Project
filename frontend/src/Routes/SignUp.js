import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './SignUp.module.css';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import UserFormDesc from '../Components/UserFormDesc';
import Footer from '../Components/Footer';
import Button from '../Components/Button';
import { signUpUrl } from '../API/User';
import { IsSignedIn, IsAuthenticated } from '../API/Middleware';
import Modal from '../Components/Modal';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [fullNameMessage, setFullNameMessage] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const isSuccessfulHandler = () => {
    setIsSuccessful(true);
  };
  const isValidFullName = () => {
    if (!fullName) {
      setFullNameMessage('Please enter your full name.');
      return false;
    }
    return true;
  };
  const isValidUsername = async () => {
    if (!username) {
      setUsernameMessage('Please enter a username.');
      return false;
    }
    try {
      const response = await fetch(
        'http://localhost:4001/user/isusernameavailable',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();
      if (!data.isAvailable) {
        setUsernameMessage(data.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  const isEmailAvailable = async () => {
    if (!email || !email.includes('@')) {
      setEmailMessage('Please enter your email.');
      return false;
    }
    try {
      const response = await fetch(
        'http://localhost:4001/user/isemailavailable',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await response.json();
      if (!data.isAvailable) {
        setEmailMessage(data.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const isValidPassword = () => {
    if (password.length < 8) {
      setPasswordMessage('Password should be at least 8 characters.');
      return false;
    }
    return true;
  };

  const setEmailHandler = (event) => {
    setEmailMessage('');
    setEmail(event.target.value.trim());
  };
  const setUsernameHandler = (event) => {
    setUsernameMessage('');
    setUsername(event.target.value.trim());
  };
  const setFullNameHandler = (event) => {
    setFullNameMessage('');
    setFullName(event.target.value.trim());
  };
  const setPasswordHandler = (event) => {
    setPasswordMessage('');
    setPassword(event.target.value);
  };
  const signUpHandler = async () => {
    const isValidForm = {
      isValidFullName: isValidFullName(),
      isValidUsername: isValidUsername(),
      isValidEmail: isEmailAvailable(),
      isValidPassword: isValidPassword(),
    };
    if (
      !isValidForm.isValidFullName ||
      !isValidForm.isValidUsername ||
      !isValidForm.isValidEmail ||
      !isValidForm.isValidPassword
    )
      return;
    const data = {
      email: email,
      username: username,
      fullName: fullName,
      password: password,
    };
    try {
      const response = await fetch(signUpUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        setIsSuccessful(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isSuccessful && (
        <Modal onClick={isSuccessfulHandler}>
          <div className={classes['modal-title']}>
            <span>Account created</span>
          </div>
          <div className={classes['modal-description']}>
            <span style={{ display: 'block' }}>
              Your account has been successfully created.
            </span>
            <span style={{ display: 'block' }}>
              Click on the Sign in button to continue.
            </span>
          </div>
          <div style={{ width: '100%' }}>
            <Link to="/signin">
              <Button>Sign in</Button>
            </Link>
          </div>
        </Modal>
      )}
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.left}>
            <UserForm title="Become a Buy&#38;Sell member">
              <UserFormInput
                value={fullName}
                onChange={setFullNameHandler}
                label="Full name"
                type="text"
                message={fullNameMessage}
              ></UserFormInput>
              <UserFormInput
                value={username}
                onChange={setUsernameHandler}
                label="Username"
                type="text"
                message={usernameMessage}
              ></UserFormInput>
              <UserFormInput
                value={email}
                onChange={setEmailHandler}
                label="Email"
                type="email"
                message={emailMessage}
              ></UserFormInput>
              <UserFormInput
                value={password}
                onChange={setPasswordHandler}
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                message={passwordMessage}
              ></UserFormInput>
              <Button onClick={signUpHandler}>Create account</Button>
              <div style={{ margin: '10px 0' }}>
                <span style={{ fontSize: '0.9rem' }}>
                  Already signed up?{' '}
                  <Link to="/signin" style={{ textDecoration: 'none' }}>
                    Sign in
                  </Link>
                </span>
              </div>
            </UserForm>
          </div>
          <div className={classes.right}>
            <UserFormDesc></UserFormDesc>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default SignUp;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSignedUrl } from './User';

export const IsSignedIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(isSignedUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        response.json().then(({ status, username, fullname }) => {
          console.log(status);
          if (status === 'logged') {
            localStorage.setItem('username', username);
            localStorage.setItem('fullname', fullname);
            navigate('/');
          } else navigate('/signin');
        });
      })
      .catch((e) => {
        navigate('/signin');
      });
  }, [navigate]);
};

export const IsAuthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(isSignedUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        response.json().then(({ status, username, fullname }) => {
          console.log(status);
          if (status === 'logged') {
            localStorage.setItem('username', username);
            localStorage.setItem('fullname', fullname);
            return;
          } else navigate('/signin');
        });
      })
      .catch((e) => {
        navigate('/signin');
      });
  }, [navigate]);
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const IsSignedIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4001/user/issigned', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      response.json().then(({ status }) => {
        if (status === 'logged') navigate('/home');
        else navigate('/signin');
      });
    });
  }, [navigate]);
};

export const IsAuthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4001/user/issigned', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      response.json().then(({ status }) => {
        if (status === 'logged') return;
        else navigate('/signin');
      });
    });
  }, [navigate]);
};

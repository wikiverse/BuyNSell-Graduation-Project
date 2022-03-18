import { useEffect, useState } from 'react';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import { userInfoUrl } from '../API/User';

const MyPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const userInfoHandler = async () => {
    try {
      const response = await fetch(userInfoUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setUsername(data.username);
      setFullname(data.fullname);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    userInfoHandler();
  }, []);
  return (
    <>
      <UserForm title="My Profile">
        <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
          <img style={{ height: '150px' }} src={image}></img>
        </div>
        <UserFormInput
          value={fullname}
          label="Full name"
          type="text"
        ></UserFormInput>
        <UserFormInput
          value={username}
          label="Username"
          type="text"
        ></UserFormInput>
        <UserFormInput value={email} label="Email" type="email"></UserFormInput>
      </UserForm>
    </>
  );
};

export default MyPage;

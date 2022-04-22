import { useEffect, useState } from 'react';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import { userInfoUrl } from '../API/User';
import defaultImg from '../Images/default.png';
import classes from './MyPage.module.css';

const MyPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const userInfoHandler = async () => {
    try {
      const response = await fetch(userInfoUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setUsername(data.username);
      setFullname(data.fullname);
      setEmail(data.email);
      setImage(data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    userInfoHandler();
  }, []);

  const uploadImage = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      console.log(formData);
      const response = await fetch(
        'http://localhost:4001/user/profilepicture',
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      );
      const result = await response.json();
      setImage(result.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        height: 'calc(100vh - 60px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserForm title="My Profile">
        <div style={{ position: 'relative' }}>
          <div className={classes['edit-button']}>
            <label htmlFor="picture">
              <i className="bi bi-pencil" style={{ marginRight: '2px' }}></i>
              Edit
            </label>
            <input
              onChange={uploadImage}
              id="picture"
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              style={{ display: 'none' }}
            />
          </div>
          <img
            className={classes.img}
            alt="Profile"
            src={image ? image : defaultImg}
          />
        </div>
        <UserFormInput
          readOnly={true}
          value={fullname}
          label="Full name"
          type="text"
        ></UserFormInput>
        <UserFormInput
          readOnly={true}
          value={username}
          label="Username"
          type="text"
        ></UserFormInput>
        <UserFormInput
          readOnly={true}
          value={email}
          label="Email"
          type="email"
        ></UserFormInput>
      </UserForm>
    </div>
  );
};

export default MyPage;

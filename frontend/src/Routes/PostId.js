import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import Description from '../Components/Description';
import Button from '../Components/Button';
import classes from './PostId.module.css';
import { useNavigate } from 'react-router-dom';

const PostId = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [email, setEmail] = useState('');
  let date = new Date();
  useEffect(() => {
    fetch(`http://localhost:4001/product/${params.postId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setIsNegotiable(data.isNegotiable);
        setImgUrl(data.imageUrl);
        setFullname(data.author.fullname);
        setProfileImg(data.author.imgUrl);
        setUsername(data.author.username);
        setEmail(data.author.email);
        date = data.date;
      })
      .catch((error) => console.log(error));
  }, []);

  const setIsSoldHandler = async () => {
    const response = await fetch(
      `http://localhost:4001/product/${params.postId}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isSold: true }),
      }
    );
  };

  const deleteHandler = () => {
    fetch(`http://localhost:4001/product/${params.postId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
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
      <UserForm title={title}>
        <div>
          <img style={{ height: '200px' }} alt="Product" src={imgUrl}></img>
        </div>
        <div style={{ width: '100%', margin: '20px 0' }}>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '5px',
            }}
          >
            <span>Author</span>
          </div>
          <div className={classes['author-row']}>
            <div className={classes.img}>
              <img src={profileImg} alt="Profile" />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                <span>{fullname}</span>
              </div>
              <div>
                <span>
                  @{username} posted on{' '}
                  {date.toLocaleString('default', { month: 'long' })}{' '}
                  {date.getDate()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <UserFormInput
          readOnly={true}
          value={price}
          label="Price"
          type="number"
          currency={true}
        />
        <Description readOnly={true} value={description} label="Description" />
        <div style={{ width: '100%', margin: '10px 0' }}>
          <span style={{ fontWeight: '600', marginRight: '10px' }}>
            Is it negotiable?
          </span>
          <label>{isNegotiable ? 'Yes' : 'No'}</label>
        </div>
        {localStorage.getItem('username') === username ? (
          <div className={classes.buttons}>
            <Button onClick={setIsSoldHandler} style={{ margin: '0 10px 0 0' }}>
              <i className="bi bi-cash-coin"></i> Sold?
            </Button>
            <Button
              onClick={deleteHandler}
              style={{ margin: '0 0 0 10px', background: '#e63946' }}
            >
              <i className="bi bi-trash3"></i> Delete
            </Button>
          </div>
        ) : (
          <div className={classes.buttons}>
            <Button
              onClick={() => {
                navigate(`/call/?calleeusername=${username}`);
              }}
              style={{ margin: '0 10px 0 0', background: 'rgb(34,139,34)' }}
            >
              <i
                style={{ marginRight: '2px' }}
                className="bi bi-telephone-forward-fill"
              ></i>{' '}
              Call
            </Button>
            <Button style={{ margin: '0 0 0 10px' }}>
              <a
                href={`mailto:${email}`}
                style={{ textDecoration: 'none', color: 'rgb(255,255,255)' }}
              >
                <i
                  style={{ marginRight: '2px' }}
                  className="bi bi-envelope-fill"
                ></i>{' '}
                Email
              </a>
            </Button>
          </div>
        )}
      </UserForm>
    </div>
  );
};

export default PostId;

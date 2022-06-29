import { useNavigate } from 'react-router-dom';
import UserForm from '../Components/UserForm';
import Description from '../Components/Description';
import Button from '../Components/Button';
import { useState } from 'react';
import classes from './PostId.module.css';
import UserFormInput from '../Components/UserFormInput';

const Match = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [matchStatus, setMatchStatus] = useState('None');
  const setDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const [matches, setMatches] = useState([]);
  return (
    <>
      <UserForm style={{ margin: '10px 0' }} title="Smart Match">
        <Description
          value={description}
          onChange={setDescriptionHandler}
          label="Description"
          placeholder="Describe your item naturally. Ex: I want a book about algorithms specifically for universities."
        />
        <Button
          style={{
            background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
          }}
          onClick={() => {
            fetch(`http://localhost:4001/product/smart-match`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                description: description,
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response);
                setMatches(response.data);
              });
          }}
        >
          Smart Match
        </Button>
      </UserForm>
      {matchStatus === 'NoMatch' && <UserForm title="No Match"></UserForm>}
      {matches.map((match) => {
        return (
          <UserForm key={match._id} title={match.title}>
            <div>
              <img
                style={{ height: '200px' }}
                alt="Product"
                src={match.imageUrl}
              ></img>
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
                  <img src={match.author.imgUrl} alt="Profile" />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                    <span>{match.author.fullName}</span>
                  </div>
                  <div>
                    <span>@{match.author.username}</span>
                  </div>
                </div>
              </div>
            </div>
            <UserFormInput
              readOnly={true}
              value={match.price}
              label="Price"
              type="number"
              currency={true}
            />
            <Description
              readOnly={true}
              value={match.description}
              label="Description"
            />
            <div style={{ width: '100%', margin: '10px 0' }}>
              <label>Is it negotiable? </label>
              <span style={{ fontWeight: '600', marginRight: '10px' }}>
                {match.isNegotiable ? 'Yes' : 'No'}
              </span>
            </div>

            <div className={classes.buttons}>
              <Button
                onClick={() => {
                  navigate(`/posts/${match._id}`);
                }}
                style={{ margin: '0 0 0 10px' }}
              >
                <a
                  style={{ textDecoration: 'none', color: 'rgb(255,255,255)' }}
                >
                  Visit
                </a>
              </Button>
            </div>
          </UserForm>
        );
      })}
    </>
  );
};

export default Match;

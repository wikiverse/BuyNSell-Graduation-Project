import { useState } from 'react';
import UserForm from '../Components/UserForm';
import UserFormInput from '../Components/UserFormInput';
import Description from '../Components/Description';
import Button from '../Components/Button';
import classes from './Post.module.css';

const Post = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);

  const setTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const setDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const setPriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const setIsNegotiableHandler = (event) => {
    setIsNegotiable(event.target.checked);
  };
  const formHandler = () => {};
  return (
    <UserForm title="Create a post for your item">
      <UserFormInput
        value={title}
        onChange={setTitleHandler}
        label="Title"
        type="text"
      />
      <UserFormInput
        value={price}
        onChange={setPriceHandler}
        label="Price"
        type="number"
      />
      <Description
        value={description}
        onChange={setDescriptionHandler}
        label="Description"
      />
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <label>
          <span style={{ fontWeight: '600', marginRight: '10px' }}>
            Upload image:
          </span>
        </label>
        <input accept="image/png" type="file" />
      </div>
      <div style={{ width: '100%', margin: '10px 0' }}>
        <span style={{ fontWeight: '600', marginRight: '10px' }}>
          Is it negotiable?
        </span>
        <label>Yes</label>
        <input onChange={setIsNegotiableHandler} type="checkbox"></input>
      </div>
      <Button style={{ margin: '20px 0' }} onClick={formHandler}>
        Submit
      </Button>
    </UserForm>
  );
};

export default Post;

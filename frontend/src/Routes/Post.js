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
  const [image, setImage] = useState();
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
  const formHandler = async () => {
    if (!title || !description || !image) {
      alert();
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('isNegotiable', isNegotiable);
      console.log(formData);
      const response = await fetch('http://localhost:4001/product/new', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      console.log(response);
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
          <input
            onChange={(event) => setImage(event.target.files[0])}
            accept="image/png, image/jpeg, image/jpg"
            type="file"
          />
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
    </div>
  );
};

export default Post;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import InvalidPath from './Routes/InvalidPath';
import SignUp from './Routes/SignUp';
import SignIn from './Routes/SignIn';
import Home from './Routes/Home';
import MyPage from './Routes/MyPage';
import Post from './Routes/Post';
import PostId from './Routes/PostId';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="mypage" element={<MyPage />}></Route>
          <Route path="post" element={<Post />}></Route>
          <Route path="posts/:postId" element={<PostId />} />
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>

        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

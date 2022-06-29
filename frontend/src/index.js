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
import { ContextProvider } from './Routes/Context';
import Call from './Routes/Call';
import Search from './Routes/Search';
import Match from './Routes/Match';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
            <Route path="post" element={<Post />}></Route>
            <Route path="posts/:postId" element={<PostId />} />
            <Route path="call" element={<Call />} />
            <Route path="search" element={<Search />} />
            <Route path="match" element={<Match />} />
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="*" element={<InvalidPath />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

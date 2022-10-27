import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Pages importation
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

// App Css code
import './App.css';
import { Layout } from '../Layouts/Layout';
import { Spin } from 'antd';

const App = () => {

  let navigate = useNavigate();
  const auth = useSelector(state => state.user.authenticathed);
  const loading = useSelector(state => state.user.loading);

  // useEffect(() => {
  //   if (auth) {
  //     return navigate("/home");
  //   }
  // }, [auth]);

  function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
  }

  return (
    <>
      <Spin spinning={loading}>
        <Routes>
          <Route path="/" element={auth ? <Navigate to="/home" replace /> : <Login />} />
          <Route path="/home" element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        </Routes>
      </Spin>
    </>
  );
}

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.user.authenticathed);
  return auth ? children : <Navigate to="/" replace/>;
}

export default App;

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Pages importation
import Login from '../pages/Login';
import Accueil from '../pages/Accueil';
import Profile from '../pages/Profile';
import MesHoraires from "../pages/MesHoraires";
import Configuration from '../pages/Configuration';
import NotFound from '../pages/NotFound';

// Pages Admin
import Dashboard from '../pages/admin/Dashboard';

// App Css code
import './App.css';
import { Layout } from '../components/Layouts/Layout';
import { LayoutAdmin } from './Layouts/admin/LayoutAdmin';

const App = () => {

  let navigate = useNavigate();
  const auth = useSelector(state => state.user.authenticathed);
  const is_admin = useSelector(state => state.user.user.is_admin);
  const loading = useSelector(state => state.user.loading);

  // useEffect(() => {
  //   if (auth) {
  //     return navigate("/Accueil");
  //   }
  // }, [auth]);

  function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
  }

  return (
    <>
      <Routes>
        <Route path="/" element={((auth === true) && (is_admin === 1)) ? (<Navigate to="/dashboard" replace />) : ((auth === true) && (is_admin === 0)) ? <Navigate to="/accueil" replace /> : <Login />} />
        <Route path="/accueil" element={<PrivateRoute><Layout><Accueil /></Layout></PrivateRoute>} />
        <Route path='/mes-horaires' element={<PrivateRoute><Layout><MesHoraires /></Layout></PrivateRoute>} />
        <Route path='/configuration' element={<PrivateRoute><Layout><Configuration /></Layout></PrivateRoute>} />
        <Route path='/profil' element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path='/dashboard' element={<AdminRoute><LayoutAdmin><Dashboard /></LayoutAdmin></AdminRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.user.authenticathed);
  const is_admin = useSelector(state => state.user.user.is_admin);
  return ((auth === true) && (is_admin === 0)) ? children : <Navigate to="/" replace />;
}

function AdminRoute ({ children }) {
  const is_admin = useSelector(state => state.user.user.is_admin);
  const auth = useSelector(state => state.user.authenticathed);
  return ((auth === true) && (is_admin === 1)) ? children : <Navigate to="/" replace />;
}

export default App;

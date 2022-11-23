import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../redux/actions/users.actions";
// Pages importation
import Login from '../pages/Login';
import Accueil from '../pages/Accueil';
import Profile from '../pages/Profile';
import MesHoraires from "../pages/MesHoraires";
import Configuration from '../pages/Configuration';
import Very from '../pages/Very';
import NotFound from '../pages/NotFound';

// Pages Admin
import Dashboard from '../pages/admin/Dashboard';
import Utilisateurs from '../pages/admin/Utilisateurs';

// App Css code
import './App.css';
import { Layout } from '../components/Layouts/Layout';
import { LayoutAdmin } from './Layouts/admin/LayoutAdmin';
import NewUser from '../pages/NewUser';

const App = () => {

  let navigate = useNavigate();
  const auth = useSelector(state => state.user.authenticathed);
  const is_admin = useSelector(state => state.user.user.is_admin);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  const redirectToLogin = () => {
    return navigate('/');
}

  // useEffect(() => {
  //   if (is_admin === 2)
  //     dispatch(userActions.logout(redirectToLogin));
  // }, [auth]);

  return (
    <>
      <Routes>
        <Route path='/very/:token' element={<Very />} />
        <Route path='/creer-un-compte' element={<NewUserRoute><NewUser /></NewUserRoute>} />
        <Route path="/" element={((auth === true) && (is_admin === 1)) ? (<Navigate to="/dashboard" replace />) : ((auth === true) && (is_admin === 0)) ? <Navigate to="/accueil" replace /> : <Login />} />
        <Route path="/accueil" element={<PrivateRoute><Layout><Accueil /></Layout></PrivateRoute>} />
        <Route path='/mes-horaires' element={<PrivateRoute><Layout><MesHoraires /></Layout></PrivateRoute>} />
        <Route path='/configuration' element={<PrivateRoute><Layout><Configuration /></Layout></PrivateRoute>} />
        <Route path='/profil' element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path='/dashboard' element={<AdminRoute><LayoutAdmin><Dashboard /></LayoutAdmin></AdminRoute>} />
        <Route path='/utilisateurs' element={<AdminRoute><LayoutAdmin><Utilisateurs /></LayoutAdmin></AdminRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

function NewUserRoute({ children }) {
  const new_user = useSelector(state => state.user.user.new_user);
  return (new_user === 1) ? children : <Navigate to="/" replace />;
}

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.user.authenticathed);
  const is_admin = useSelector(state => state.user.user.is_admin);
  return ((auth === true) && (is_admin === 0)) ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const is_admin = useSelector(state => state.user.user.is_admin);
  const auth = useSelector(state => state.user.authenticathed);
  return ((auth === true) && (is_admin === 1)) ? children : <Navigate to="/" replace />;
}

export default App;

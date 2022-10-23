import { Routes, Route } from 'react-router-dom';

// Pages importation
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

// App Css code
import './App.css';
import { Layout } from '../Layouts/Layout';

function App() {

  function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
  }


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path='/profile' element={<Layout><Profile /></Layout>} />
      </Routes>
    </>
  );
}

export default App;

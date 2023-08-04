import React from 'react';
import './App.css';
import { Header, Footer } from './components';
import {
  About,
  Contact,
  LandingPage,
  Login,
  NotFound,
  Register,
} from './pages';
import AppContext from './components/AppContext';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleLogin(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
    navigate(-1);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate('/');
  }

  const contextValue = { user, token, handleLogin, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="relative flex min-h-screen flex-col">
        <Header user={user} />
        <div className="page-container flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;

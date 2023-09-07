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
  YourCats,
  CatEntry,
  UpdateCatEntry,
} from './pages';
import AppContext from './components/AppContext';
import { CatProvider } from './components/CatContext';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function loadUser() {
      const auth = localStorage.getItem(tokenKey);
      if (auth) {
        const a = JSON.parse(auth);
        const { user, token } = a;
        setUser(user);
        setToken(token);
      }
      setIsAuthorizing(false);
    }
    setIsAuthorizing(true);
    loadUser();
  }, []);

  if (isAuthorizing) return null;

  function handleLogin(auth) {
    const { user, token } = auth;
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(user);
    setToken(token);
    navigate('/');
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
      <CatProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header user={user} />
          <div className="page-container flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/yourcats" element={<YourCats />} />
              <Route path="/catentry" element={<CatEntry />} />
              <Route
                path="/updatecatentry/:catId"
                element={<UpdateCatEntry />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CatProvider>
    </AppContext.Provider>
  );
}

export default App;

import { createContext, useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';
import { readCats, addCat } from '../components/data.js';

export const CatContext = createContext();

export function CatProvider({ children }) {
  const [cats, setCats] = useState([]);
  const [isCatsLoading, setIsCatsLoading] = useState();
  const [addCatError, setAddCatError] = useState();
  const [catsError, setCatsError] = useState();
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  async function loadCats(token) {
    try {
      setIsCatsLoading(true);
      const loadedCats = await readCats(token);
      setCats(loadedCats);
    } catch (err) {
      setCatsError(err);
    } finally {
      setIsCatsLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      setCatsError(null);
      loadCats(token);
    }
  }, [user, token]);

  async function handleCreateCat(event) {
    event.preventDefault();
    try {
      setIsCatsLoading(true);
      await addCat(event, token);
      await loadCats(token);
      navigate('/yourcats');
    } catch (err) {
      setAddCatError(err);
    } finally {
      setIsCatsLoading(false);
    }
  }

  const contextValue = {
    cats,
    isCatsLoading,
    catsError,
    addCatError,
    setAddCatError,
    handleCreateCat,
  };
  return (
    <CatContext.Provider value={contextValue}>{children}</CatContext.Provider>
  );
}

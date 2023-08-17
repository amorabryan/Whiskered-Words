import { createContext, useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';
import { readCats, addCat, updateCat } from '../components/data.js';

export const CatContext = createContext();

export function CatProvider({ children }) {
  const [cats, setCats] = useState([]);
  const [isCatsLoading, setIsCatsLoading] = useState(false);
  const [isUpdatingCatLoading, setIsUpdatingCatLoading] = useState(false);
  const [updateCatError, setUpdateCatError] = useState();
  const [addCatError, setAddCatError] = useState();
  const [catsError, setCatsError] = useState();
  const [catId, setCatId] = useState(null);
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

  // async function loadUpdatingCat(catId, token) {
  //   try {
  //     setIsUpdatingCatLoading(true);
  //     const loadedCat = await readCurrentCat(catId, token);
  //     setCat(loadedCat);
  //   } catch (err) {
  //     setCatsError(err);
  //   } finally {
  //     setIsUpdatingCatLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (user && catId) {
  //     setCatsError(null);
  //     loadUpdatingCat(catId, token);
  //   }
  // }, [user, token, catId]);

  async function handleUpdateCat(event, catId) {
    event.preventDefault();
    try {
      setIsCatsLoading(true);
      await updateCat(event, catId, token);
      await loadCats(token);
      navigate('/yourcats');
    } catch (err) {
      setUpdateCatError(err);
    } finally {
      setIsCatsLoading(false);
    }
  }

  const contextValue = {
    cats,
    isCatsLoading,
    isUpdatingCatLoading,
    setIsUpdatingCatLoading,
    setCatsError,
    catsError,
    addCatError,
    setAddCatError,
    updateCatError,
    setUpdateCatError,
    handleCreateCat,
    handleUpdateCat,
    catId,
    setCatId,
    loadCats,
  };
  return (
    <CatContext.Provider value={contextValue}>{children}</CatContext.Provider>
  );
}

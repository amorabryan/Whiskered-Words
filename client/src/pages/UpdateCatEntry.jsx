import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { CatContext } from '../components/CatContext';
import { readCurrentCat } from '../components/data';
import { useNavigate, useParams } from 'react-router-dom';

export function UpdateCatEntry() {
  const { catId } = useParams();
  const {
    handleUpdateCat,
    isUpdatingCatsLoading,
    updateCatError,
    setUpdateCatError,
  } = useContext(CatContext);
  const [catError, setCatError] = useState();
  const [name, setName] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [gender, setGender] = useState();
  const [ageYr, setAgeYr] = useState();
  const [ageMo, setAgeMo] = useState();
  const [breed, setBreed] = useState();
  const { user, token } = useContext(AppContext);
  const { setIsUpdatingCatLoading } = useContext(CatContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    async function loadUpdatingCat() {
      try {
        setIsUpdatingCatLoading(true);
        const loadedCat = await readCurrentCat(catId, token);

        const {
          name: currentName,
          photoUrl: currentPhotoUrl,
          gender: currentGender,
          ageYr: currentAgeYr,
          ageMo: currentAgeMo,
          breed: currentBreed,
        } = loadedCat;

        setName(currentName);
        setPhotoUrl(currentPhotoUrl);
        setGender(currentGender);
        setAgeYr(currentAgeYr);
        setAgeMo(currentAgeMo);
        setBreed(currentBreed);
      } catch (err) {
        setCatError(err);
      } finally {
        setIsUpdatingCatLoading(false);
      }
    }
    setUpdateCatError(null);
    loadUpdatingCat();
  }, [
    user,
    navigate,
    token,
    setIsUpdatingCatLoading,
    setUpdateCatError,
    catId,
  ]);

  // async function handleDelete() {
  //   try {
  //     setIsLoading(true);
  //     await removeCat(cat.catId);
  //     onSubmit();
  //   } catch (err) {
  //     alert(`Error deleting cat: ${err}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  if (isUpdatingCatsLoading) return <div>Loading...</div>;
  if (catError)
    return (
      <div className="m-24">Error loading entries: {catError.message}</div>
    );
  return (
    <div className="container mt-24">
      <div className="flex flex-wrap items-center justify-center">
        <div className="column-full flex">
          <h1>Update Your Cat!</h1>
        </div>
      </div>
      <form onSubmit={(event) => handleUpdateCat(event, catId)}>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              className="form-image mx-auto mb-2 block rounded-md"
              src={photoUrl || '/images/placeholder-image-square.jpg'}
              alt="cat"
            />
            <label className="mb-4 block">
              Photo URL
              <input
                required
                className="input-b-color text-padding purple-outline input-height margin-bottom-2 width-100 block rounded"
                type="text"
                name="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full md:w-1/2">
            <label className="mb-4 block">
              Your Cat's Name:
              <input
                required
                className="input-b-color text-padding purple-outline input-height margin-bottom-2 width-100 block rounded"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                required
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value={'placeholder'}>Gender</option>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </select>
            </label>
            <label className="mb-4 block">
              Age:
              <div className="flex">
                <input
                  required
                  className="input-b-color text-padding purple-outline input-height margin-bottom-2 block w-1/6 rounded"
                  type="text"
                  name="ageYr"
                  value={ageYr}
                  onChange={(e) => setAgeYr(e.target.value)}
                />
                <label>Year(s)</label>
                <input
                  required
                  className="input-b-color text-padding purple-outline input-height margin-bottom-2 block w-1/6 rounded"
                  type="text"
                  name="ageMo"
                  value={ageMo}
                  onChange={(e) => setAgeMo(e.target.value)}
                />
                <label>Month(s)</label>
                <br />
                {updateCatError && <div> {updateCatError.message} </div>}
              </div>
            </label>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap">
          <div className="column-full">
            <label className="mb-4 block">
              Breed
              <input
                required
                className="input-b-color text-padding purple-outline input-height margin-bottom-2 width-100 block rounded"
                type="text"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="column-full flex justify-between">
            {/* {cat && (
              <button
                disabled={isLoading}
                className="delete-cat-button"
                type="button"
                onClick={() => setIsDeleting(true)}>
                Delete Cat
              </button>
            )} */}
            <button
              className="text-padding purple-background white-text rounded"
              type="submit">
              SAVE
            </button>
          </div>
        </div>
      </form>
      {/* {isDeleting && (
        <div
          id="modalContainer"
          className="modal-container flex justify-center align-center">
          <div className="modal flex flex-wrap">
            <div className="column-full flex justify-center">
              <p>Are you sure you want to delete this cat?</p>
            </div>
            <div className="column-full flex justify-between">
              <button
                className="modal-button"
                onClick={() => setIsDeleting(false)}>
                Cancel
              </button>
              <button
                className="modal-button red-background white-text"
                onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

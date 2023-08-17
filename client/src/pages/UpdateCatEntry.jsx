import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { CatContext } from '../components/CatContext';
import { readCurrentCat } from '../components/data';
import { useNavigate, useParams } from 'react-router-dom';
import { IoEnter } from 'react-icons/io5';

export function UpdateCatEntry() {
  const { catId } = useParams();
  const {
    handleUpdateCat,
    isUpdatingCatsLoading,
    updateCatError,
    setUpdateCatError,
  } = useContext(CatContext);
  const [catError, setCatError] = useState('');
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [gender, setGender] = useState('');
  const [ageYr, setAgeYr] = useState('');
  const [ageMo, setAgeMo] = useState('');
  const [breed, setBreed] = useState('');
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

  if (isUpdatingCatsLoading) return <div>Loading...</div>;
  if (catError)
    return (
      <div className="m-24">Error loading entries: {catError.message}</div>
    );

  return (
    <div className="container mx-auto mt-24">
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="column-full brown-text text-bold flex text-2xl">
          <h1>Update Your Cat!</h1>
        </div>
      </div>
      <form onSubmit={(event) => handleUpdateCat(event, catId)}>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              className="form-image mx-auto mb-2 block max-w-xs rounded-md shadow-lg"
              src={photoUrl || '/images/placeholder-image-square.jpg'}
              alt="cat"
            />
            <label className="mb-4 block">
              Photo URL
              <input
                required
                className="mt-2 w-full rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                type="text"
                name="photoUrl"
                value={photoUrl || ''}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full md:w-1/2">
            <label className="mb-4 block">
              Your Cat's Name
              <input
                required
                className="mt-2 w-full rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                type="text"
                name="name"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                required
                className="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                name="gender"
                value={gender || ''}
                onChange={(e) => setGender(e.target.value)}>
                <option value={'placeholder'}>Gender</option>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </select>
            </label>
            <label className="mb-4 block">
              Age:
              <div className="mt-2 flex">
                <input
                  required
                  className="mr-2 w-10 rounded border border-gray-300 pl-2 focus:border-orange-500 focus:outline-none"
                  type="text"
                  name="ageYr"
                  value={ageYr || ''}
                  onChange={(e) => setAgeYr(e.target.value)}
                />
                <label className="mr-2">Year(s)</label>
                <input
                  required
                  className="mr-2 w-10 rounded border border-gray-300 pl-2 focus:border-orange-500 focus:outline-none"
                  type="text"
                  name="ageMo"
                  value={ageMo || ''}
                  onChange={(e) => setAgeMo(e.target.value)}
                />
                <label className="mr-2">Month(s)</label>
                <br />
                {updateCatError && <div> {updateCatError.message} </div>}
              </div>
            </label>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap">
          <div className="column-full">
            <label className="mb-4 block">
              Breed <br />
              <input
                required
                className="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                type="text"
                name="breed"
                value={breed || ''}
                onChange={(e) => setBreed(e.target.value)}
              />
              <div className="mt-2 flex flex-col text-center text-sm text-gray-600">
                If you don't know your cat's breed, that's okay! Most cats are
                mixed breed so select “Mixed/Unknown”. If entering in multiple
                breeds, please use a comma ( , ) after each breed. Need help
                spelling? Visit{' '}
                <a
                  href="https://www.purina.com/cats/cat-breeds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:underline">
                  https://www.purina.com/cats/cat-breeds
                </a>{' '}
                to see the breed names.
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="mt-6 w-full text-center">
            <button
              type="submit"
              className="brown-background flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
              <IoEnter color={'#E7DDD2'} size={36} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useContext, useEffect, useState } from 'react';
import { IoEnter } from 'react-icons/io5';
import AppContext from '../components/AppContext';
import { CatContext } from '../components/CatContext';
import { useNavigate } from 'react-router-dom';

export function CatEntry() {
  const { user } = useContext(AppContext);
  const { handleCreateCat, isCatsLoading, addCatError, setAddCatError } =
    useContext(CatContext);
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    setAddCatError(null);
  }, [user, navigate, setAddCatError]);

  if (isCatsLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-24">
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="column-full brown-text text-bold flex text-2xl">
          <h1>Register Your Cat!</h1>
        </div>
      </div>
      <form onSubmit={handleCreateCat}>
        <div className="flex flex-wrap">
          <div className="w-full px-2 md:w-1/2">
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
          <div className="w-full px-2 md:w-1/2">
            <label className="mb-4 block">
              Your Cat's Name:
              <input
                required
                className="mt-2 w-full rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                type="text"
                name="name"
              />
            </label>
            <label className="mb-4 block">
              Gender: <br />
              <select
                required
                className="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                name="gender">
                <option value={'placeholder'}>Gender</option>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </select>
            </label>
            <label className="mb-4 block">
              Age: <br />
              <div className="flex">
                <input
                  required
                  className="mr-2 w-10 rounded border border-gray-300 pl-2 focus:border-orange-500 focus:outline-none"
                  type="text"
                  name="ageYr"
                />
                <label>Year(s)</label>
                <input
                  required
                  className="mr-2 w-10 rounded border border-gray-300 pl-2 focus:border-orange-500 focus:outline-none"
                  type="text"
                  name="ageMo"
                />
                <label>Month(s)</label>
                {addCatError && <div> {addCatError.message} </div>}
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="column-full">
            <label className="mb-4 block px-2">
              Breed <br />
              <input
                required
                className="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                type="text"
                name="breed"
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
        <div className="mb-4 flex flex-wrap justify-end">
          <div className="column-full flex justify-between">
            <button
              type="submit"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-orange-400">
              <IoEnter color={'#E7DDD2'} size={36} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

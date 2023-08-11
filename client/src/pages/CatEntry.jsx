import { useContext, useEffect } from 'react';
import AppContext from '../components/AppContext';
import { CatContext } from '../components/CatContext';
import { useNavigate } from 'react-router-dom';

export function CatEntry() {
  const { user } = useContext(AppContext);
  const { handleCreateCat, isCatsLoading, addCatError, setAddCatError } =
    useContext(CatContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    setAddCatError(null);
  }, [user, navigate, setAddCatError]);

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

  if (isCatsLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-24">
      <div className="flex flex-wrap items-center justify-center">
        <div className="column-full flex">
          <h1>Register Your Cat!</h1>
        </div>
      </div>
      <form onSubmit={handleCreateCat}>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              className="form-image mx-auto mb-2 block rounded-md"
              src={'/images/placeholder-image-square.jpg'}
              alt="cat"
            />
            <label className="mb-4 block">
              Photo URL
              <input
                required
                className="input-b-color text-padding purple-outline input-height margin-bottom-2 width-100 block rounded"
                type="text"
                name="photoUrl"
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
              />
            </label>
            <label>
              Gender:
              <select required name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                />
                <label>Year(s)</label>
                <input
                  required
                  className="input-b-color text-padding purple-outline input-height margin-bottom-2 block w-1/6 rounded"
                  type="text"
                  name="ageMo"
                />
                <label>Month(s)</label>
                {addCatError && <div> {addCatError.message} </div>}
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

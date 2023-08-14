import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { CatContext } from '../components/CatContext';
import { FaPencilAlt } from 'react-icons/fa';

export function YourCats({ onCreate, onEdit }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const { cats, isCatsLoading, catsError, setCatId } = useContext(CatContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isCatsLoading) return <div>Loading...</div>;
  if (catsError)
    return (
      <div className="m-24">Error loading entries: {catsError.message}</div>
    );

  return (
    <>
      <div className="cat-container mt-24">
        <div className="flex flex-wrap items-center justify-around pb-6">
          <div className="px-10"></div>
          <h2 className="brown-text text-3xl text-gray-800">Your Cats</h2>
          <Link to="/catentry">
            <button
              className="rounded bg-stone-400 px-4 py-2 text-stone-200 hover:bg-stone-500"
              onClick={onCreate}>
              Add A New Cat
            </button>
          </Link>
        </div>
        {cats.length > 0 ? (
          <div className="flex flex-wrap">
            <div className="flex w-full justify-center">
              <ul className="flex flex-col flex-wrap justify-center md:flex-row">
                {cats.map((cat) => (
                  <Cat
                    key={cat.catId}
                    cat={cat}
                    onEdit={onEdit}
                    setCatId={setCatId}
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>No Cats</div>
        )}
      </div>
    </>
  );
}

function Cat({ cat, setCatId }) {
  const navigate = useNavigate();
  const { name, photoUrl, catId } = cat;

  const handleEditClick = () => {
    setCatId(catId);
    navigate(`/updatecatentry/${catId}`);
  };

  return (
    <li className="flex justify-center px-4 pb-8">
      <div className="cat-profile flex">
        <div className="flex flex-col items-center justify-center rounded-md bg-gradient-to-t from-orange-400">
          <img
            className="form-image mx-auto mb-2 block w-11/12 rounded-md"
            src={photoUrl}
            alt={name}
          />
          <h3 className="pb-2 text-gray-600">
            <strong>{name}</strong>
          </h3>
        </div>
        <div className="pl-5">
          <FaPencilAlt
            className="fa-solid fa-pencil"
            onClick={handleEditClick}
          />
        </div>
      </div>
    </li>
  );
}

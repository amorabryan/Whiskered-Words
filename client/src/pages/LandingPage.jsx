import Carousel from './Carousel';
import './Global.css';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { useContext } from 'react';

const images = [
  {
    id: 1,
    src: '/images/catrousel1.jpg',
    alt: 'Bengal Kittens Playing',
  },
  {
    id: 2,
    src: '/images/catrousel2.jpg',
    alt: 'Cats Cleaning',
  },
  {
    id: 3,
    src: '/images/catrousel3.jpg',
    alt: 'Cats Eating',
  },
  {
    id: 4,
    src: '/images/catrousel4.jpg',
    alt: 'Cat On Cat Tower',
  },
  {
    id: 5,
    src: '/images/catrousel5.jpg',
    alt: 'Cats Sleeping',
  },
];

export function LandingPage() {
  return (
    <>
      <div className="w-full">
        <StarterCard />
      </div>
      <div className="carousel-container w-full justify-evenly md:flex">
        <Info />
        <Carousel images={images} />
      </div>
    </>
  );
}

function StarterCard() {
  const { user } = useContext(AppContext);

  return (
    <div className="row-one relative">
      <div className="relative">
        <img
          src="/images/bengalbg.jpg"
          alt="Background"
          className="h-auto w-full"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>
      <div className="bgimage-text bg-yellow-900 p-9 text-left text-stone-200 md:absolute md:right-48 md:top-1/2 md:bg-transparent">
        <h1 className="text-2xl font-bold">Welcome to Whiskered Words!</h1>
        <p className="text-lg">
          Create an online journal for your mighty moggies
        </p>
        {!user ? (
          <Link to="/register">
            <button className="mt-4 rounded bg-stone-400 px-6 py-2 text-stone-200 hover:bg-stone-500">
              Start Here
            </button>
          </Link>
        ) : (
          <Link to="/yourcats">
            <button className="mt-4 rounded bg-stone-400 px-6 py-2 text-stone-200 hover:bg-stone-500">
              See Your Cats
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

function Info() {
  return (
    <>
      <div className="align-center flex flex-col justify-center p-9 md:w-1/2">
        <h1 className="brown-text text-xl font-bold">
          What is Whiskered Words?
        </h1>
        <p>
          Welcome to Whiskered Words, an esteemed online journal platform
          celebrating the cherished companionship of your fantastic felines.
        </p>
        <p>
          Create profiles, generate entries, and share photos of your whiskered
          darlings with elegance and grace. Join us to honor the timeless bond
          between you and your extraordinary companions today.
        </p>
      </div>
    </>
  );
}

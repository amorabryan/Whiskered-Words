import { FaCat, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import AppContext from './AppContext';

export function Header() {
  return (
    <>
      <div className="header-container fixed left-0 top-0 z-[100] flex w-full items-center justify-between bg-zinc-800 pb-2 pt-8">
        <div className="flex justify-between">
          <Link to="/" className="px-3 text-xl text-stone-200">
            Whiskered Words
          </Link>
          <FaCat color={'#E7DDD2'} size={'28px'} />
        </div>
        <Hamburger />
        <NavList />
      </div>
    </>
  );
}

function NavList() {
  const location = useLocation();
  const { user, handleSignOut } = useContext(AppContext);

  const activePage = 'text-orange-400 hover:text-orange-500';
  const inactivePage = 'text-stone-200 hover:text-orange-500';

  return (
    <>
      <div className="hidden pr-3 md:flex">
        <p
          className={`cursor-pointer p-2 pr-5 ${
            location.pathname === '/' ? activePage : inactivePage
          }`}>
          <Link to="/" className="header-title">
            Home
          </Link>
        </p>

        <p
          className={`cursor-pointer p-2 pr-5 ${
            location.pathname === '/register' ? activePage : inactivePage
          }`}>
          {!user ? (
            <Link to="/register" className="header-title">
              Register
            </Link>
          ) : (
            <Link to="/yourcats" className="header-title">
              Your Cats
            </Link>
          )}
        </p>

        <p
          className={`cursor-pointer p-2 pr-5 ${
            location.pathname === '/login' ? activePage : inactivePage
          }`}>
          {!user ? (
            <Link to="/login" className="header-title">
              Sign In
            </Link>
          ) : (
            <Link to="/" className="header-title" onClick={handleSignOut}>
              Sign Out
            </Link>
          )}
        </p>

        <p
          className={`cursor-pointer p-2 pr-5 ${
            location.pathname === '/about' ? activePage : inactivePage
          }`}>
          <Link to="/about" className="header-title">
            About
          </Link>
        </p>

        <p
          className={`cursor-pointer p-2 pr-5 ${
            location.pathname === '/contact' ? activePage : inactivePage
          }`}>
          <Link to="/contact" className="header-title">
            Contact
          </Link>
        </p>
      </div>
    </>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, handleSignOut } = useContext(AppContext);

  const activePage = 'text-orange-400 hover:text-orange-500';
  const inactivePage = 'text-stone-200 hover:text-orange-500';

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  function handleSignOutClick() {
    closeDrawer();
    handleSignOut();
  }

  return (
    <>
      <div className="flex md:hidden">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeDrawer}
            style={{ zIndex: 99 }}
          />
        )}
        <div
          className={`fixed right-0 top-0 h-full w-1/3 transform bg-yellow-900 pt-8 shadow-md transition-transform duration-300 md:w-2/3 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 100 }}>
          <p
            onClick={closeDrawer}
            className={`cursor-pointer p-2 pr-5 ${
              location.pathname === '/' ? activePage : inactivePage
            }`}>
            <Link to="/" className="header-title">
              Home
            </Link>
          </p>

          <p
            onClick={closeDrawer}
            className={`cursor-pointer p-2 pr-5 ${
              location.pathname === '/register' ? activePage : inactivePage
            }`}>
            {!user ? (
              <Link to="/register" className="header-title">
                Register
              </Link>
            ) : (
              <Link to="/yourcats" className="header-title">
                Your Cats
              </Link>
            )}
          </p>

          <p
            onClick={closeDrawer}
            className={`cursor-pointer p-2 pr-5 ${
              location.pathname === '/login' ? activePage : inactivePage
            }`}>
            {!user ? (
              <Link to="/login" className="header-title">
                Sign In
              </Link>
            ) : (
              <Link
                to="/"
                className="header-title"
                onClick={handleSignOutClick}>
                Sign Out
              </Link>
            )}
          </p>

          <p
            onClick={closeDrawer}
            className={`cursor-pointer p-2 pr-5 ${
              location.pathname === '/about' ? activePage : inactivePage
            }`}>
            <Link to="/about" className="header-title">
              About
            </Link>
          </p>

          <p
            onClick={closeDrawer}
            className={`cursor-pointer p-2 pr-5 ${
              location.pathname === '/contact' ? activePage : inactivePage
            }`}>
            <Link to="/contact" className="header-title">
              Contact
            </Link>
          </p>
        </div>
        {!isOpen && (
          <div
            className="hamburger-icon cursor-pointer pr-3"
            onClick={toggleDrawer}
            style={{ zIndex: 101, pointerEvents: 'auto' }}>
            <FaBars color={'#E7DDD2'} className="text-3xl" />
          </div>
        )}
      </div>
    </>
  );
}

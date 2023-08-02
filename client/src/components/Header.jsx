import { FaCat, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Register' },
  { to: '/login', label: 'Login' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Header(props) {
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

  return (
    <>
      <div className="hidden pr-3 md:flex">
        {links.map((link, index) => {
          const isActive = link.to === location.pathname;
          return (
            <p
              key={index}
              className={`cursor-pointer p-2 pr-5 text-stone-200 ${
                isActive
                  ? 'text-orange-400 hover:text-orange-500'
                  : 'hover:text-orange-500'
              }`}>
              <Link to={link.to} className="header-title">
                {link.label}
              </Link>
            </p>
          );
        })}
      </div>
    </>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  function closeDrawer() {
    setIsOpen(false);
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
          {links.map((link, index) => {
            const isActive = link.to === location.pathname;
            return (
              <p
                key={index}
                className={`cursor-pointer p-2 text-stone-200 ${
                  isActive
                    ? 'text-orange-400 hover:text-orange-500'
                    : 'hover:text-orange-500'
                }`}
                onClick={closeDrawer}>
                <Link to={link.to} className="header-title">
                  {link.label}
                </Link>
              </p>
            );
          })}
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

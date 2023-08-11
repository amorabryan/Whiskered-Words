import './Global.css';
import { IoEnter } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../components/AppContext';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogin } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [user, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const response = await fetch('/api/auth/sign-in', req);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}, ${result.error}`);
      }
      handleLogin(result);
      console.log('Signed In', result.user, '; received token:', result.token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="login-container w-full">
        <div className="row-one">
          <div className="col-one mb-8 mt-24 flex w-full flex-col items-center">
            <h2 className="brown-text text-bold text-4xl">LOG IN</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  required
                  className="m-4 block w-96 rounded border-2 border-black p-2 text-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </label>
              <label>
                <input
                  required
                  className="m-4 block w-96 rounded border-2 border-black p-2 text-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </label>
              <div className="ml-4 flex w-96 items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xl">Don't have an account?</p>
                  <Link to="/register" className="text-orange-400 underline">
                    Register Here
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="brown-background flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
                  <IoEnter color={'#E7DDD2'} size={36} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import './Global.css';
import { IoEnter } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export function Register() {
  return (
    <>
      <div className="register-container w-full">
        <div className="row-one">
          <div className="col-one mb-8 mt-24 flex w-full flex-col items-center">
            <h2 className="brown-text text-bold text-4xl">REGISTER</h2>
            <br />
            <form>
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
                  <Link to="/login" className="text-orange-400 underline">
                    Login Here
                  </Link>
                </div>
                <div className="brown-background flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
                  <IoEnter color={'#E7DDD2'} size={36} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

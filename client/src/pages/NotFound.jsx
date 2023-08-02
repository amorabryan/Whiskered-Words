import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <div className="col mb-5 text-center">
        <h3>Well, you've ventured too far. Please come back home.</h3>
        <Link to="/" className="text-muted">
          Return Home
        </Link>
      </div>
    </div>
  );
}

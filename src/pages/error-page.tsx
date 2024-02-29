import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '50px' }}>

      <h1>Oops, there was an error!</h1>
      <p>We are already working to eliminate it. We apologize for the inconvenience.</p>
      </div>
      <p>Try:</p>
      <ul>
        <li>Reload page</li>
        <li>Return to <Link to="/">home page</Link></li>
        <li>Contact us if the problem persists</li>
      </ul>
    </div>
  );
};

export default ErrorPage;

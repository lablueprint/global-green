'use client';

import React, { useEffect, useState } from 'react';

function VerifyEmail() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  const handleVerifyEmail = async () => {
    try {
      const res = await fetch('/api/users/verifyemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
        window.location.href = '/profile';
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(
    () => {
      async function getUserDetails() {
        const res = await fetch('/api/users/me');
        const data = await res.json();
        setUserName(data.user.userName);
      }
      getUserDetails();
    },
    [],
  );

  return (
    <div>
      <h1>
        Welcome,
        {' '}
        {userName}
        . Please check your email for a verification code to verify your account.
      </h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter token"
      />
      <button type="button" onClick={handleVerifyEmail}>Verify Email</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyEmail;

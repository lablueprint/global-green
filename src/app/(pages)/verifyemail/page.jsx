'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

function VerifyEmail() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [cooldown, setCooldown] = useState(60); // 60 seconds cooldown
  const intervalRef = React.useRef();
  const { data: session, update } = useSession();
  const [verified, setVerified] = useState(false);

  async function fetchUpdatedUserDetails(id) {
    if (!id) return;
    const response = await fetch(
      '/api/users/me',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    setExpiresAt(new Date(data.user.verifyExpires));
    setVerified(data.user.verified);
    console.log('data at verifyemail', data);
    if (data.user.verified) {
      // stop all intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      // make sure the session is updated
      await update();
      // redirect to profile page
      window.location.href = '/profile';
      
      
    }

  }
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
        await fetchUpdatedUserDetails(session.user.id);

        
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (verified) {
      window.location.href = '/profile';
      return;
    }
    else {
    if (session) {
      await signOut();
    }
    alert('Your verification time has expired. Please sign up again.');
    await signOut();
  }

  };

  const updateTimer = () => {
    if (expiresAt) {
      const currentTime = new Date();
      const diff = expiresAt - currentTime;
      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(intervalRef.current); // Assuming you have a ref for this interval as well
        handleLogout();
        
        
      } else {
        setTimeLeft(Math.round(diff / 1000));
      }
    }
  };

  async function getUserDetails(id) {
    if (!id) return;
    const response = await fetch(
      '/api/users/me',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    console.log('data', data);
    setExpiresAt(new Date(data.user.verifyExpires));
    setUserName(data.user.userName);
    setUserEmail(data.user.email);
  }

  function startResendCooldown() {
    const intervalId = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setResendDisabled(false);
          return 60; // Immediately return 60 to reset, but this line is only for clarity
        }
        return prev - 1;
      });
    }, 1000);
    return intervalId;
  }

  async function resendVerificationEmail() {
    try {
      const res = await fetch('/api/users/resendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage(`${data.message} You can resend in 60 seconds.`);
        await fetchUpdatedUserDetails(session.user.id);
        setResendDisabled(true);
        setCooldown(60);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = startResendCooldown();
      }
    } catch (err) {
      setError(err.message);
      setResendDisabled(true);
    }
  }

  useEffect(
    () => {
      console.log('session', session);

      if (session?.user?.verified) {
        window.location.href = '/profile';
      } 

      // if no user logged in, redirect to login page
      if (!session) {
        window.location.href = '/login';
      }
      if (session?.user?.id) getUserDetails(session.user.id);

      // make sure only one interval is running at a time
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = startResendCooldown();
      return () => clearInterval(intervalRef.current);
    },
    [session],
  );

  useEffect(() => {
    const timer = expiresAt ? setInterval(updateTimer, 1000) : null;

    // Cleanup timer on component unmount or when expiresAt changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [expiresAt]); // Dependency array includes expiresAt to re-trigger countdown when it's updated

  function renderIndicator() {
    if (timeLeft === null) {
      return <p>Loading...</p>;
    } if (timeLeft > 0) {
      return (
        <div>
          <p>
            Your account will be deleted in
            {' '}
            {timeLeft}
            {' '}
            seconds. Please verify your email before then.
            {' '}
            This is to ensure that your account is secure.
          </p>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter token"
          />
          <button type="button" onClick={handleVerifyEmail}>Verify Email</button>
          <p>
            Did&apos;t receive the email?
          </p>
          <button type="button" onClick={resendVerificationEmail} disabled={resendDisabled}>
            {resendDisabled ? `Resend in ${cooldown} seconds` : 'Resend Verification'}
          </button>
        </div>
      );
    }
    return <p>Your verification time has expired. Please sign up again.</p>;
  }
  return (
    <div>
      <h1>
        Welcome back
        {' '}
        {userName}
        . Please check your email for a verification code to verify your account.
      </h1>
      {renderIndicator()}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyEmail;

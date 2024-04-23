'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import styles from './page.module.css';


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
  const { data: session } = useSession();

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
        window.location.href = '/profile';
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    alert('Your verification time has expired. Please sign up again.');
    window.location.href = '/signup';
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
      return (
        <div className={styles.contentContainer}>
          <h3 className={styles.verificationTitle}>Enter Verification Code</h3>
          <p className={styles.accountDeletionNotice}>
            We have sent a code to {userName} <br/>
            Please enter received code to continue.
          </p>
  
          <div className={styles.tokenInputContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text" 
                maxLength="1"
                value={token[index] || ''} // set value to the corresponding char from the token
                onChange={(e) => {
                  let newToken = token.split(''); // split the token into an array of characters
                  newToken[index] = e.target.value; // replace char at current index with the new value
                  setToken(newToken.join('')); // updates the token state
                }}
                className={styles.tokenInput}
                autoFocus={index === 0}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !token[index] && index > 0) {
                    e.preventDefault(); // preventing default backspace option
                    const prevInput = e.target.form[index -1];
                    prevInput.focus();
                    prevInput.select();
                  }
                }}
                onInput={(e) => {
                  const nextInput = e.target.form[index + 1]; // find the next input field
                  if (nextInput && e.target.value) {
                    nextInput.focus();
                  }
                }}
              />
            ))}
          </div>
  
          <div style={{ textAlign: 'center', marginTop: '20px'}}>
            <p style={{ display: 'inline'}}>Didn't receive a code?</p>
            <span 
              onClick={!resendDisabled ? resendVerificationEmail : undefined} 
              className={resendDisabled ? styles.resendTextDisabled : styles.resendText}
              style={{ cursor: resendDisabled ? 'default' : 'pointer', marginLeft: '10px' }}
            >
              {resendDisabled ? `Resend in ${cooldown} seconds` : 'Click to resend'}
            </span>
          </div>
  
          <button 
            type="button" 
            onClick={handleVerifyEmail}
            className={styles.verifyButton}
          >
            Verify your account
          </button>
        </div>
      );
    }
    return <p>Your verification time has expired. Please sign up again.</p>;
  }
  
  return (
    <div>
      <p>
        Welcome back
        {' '}
        {userName}
        . Please check your email for a verification code to verify your account.
      </p>
      {renderIndicator()}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyEmail;

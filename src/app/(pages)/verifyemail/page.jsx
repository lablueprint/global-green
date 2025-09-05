'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import styles from './page.module.css';
import Image from 'next/image';
import SignInLogo from '@/app/components/logos/signInLogo';

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
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    setExpiresAt(new Date(data.user.verifyExpires));
    setVerified(true);
    // setVerified(data.user.verified);
    console.log('data at verifyemail', data);
    if (data.user.verified) {
      // Stop all intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Relogin to get updated session
      await signIn('credentials', {
        username: data.user.userName,
        password: data.user.password,
      });
      // Redirect to profile page
      window.location.href = '/landing';
    }
  }

  // const handleVerifyEmail = async () => {
  //   try {
  //     const res = await fetch('/api/users/verifyemail', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token }),
  //     });
  //     const data = await res.json();
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setMessage(data.message);
  //       await fetchUpdatedUserDetails(session.user.id);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  const handleVerifyEmail = async () => {
    try {
      // First, update the MongoDB document
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          update: {
            $set: {
              verified: true,
              verifyExpires: null, // Clear the expiration
            },
          },
        }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      // Update local state
      setMessage('Account verified successfully!');
      setVerified(true);

      // Update the session
      await update({
        ...session,
        user: {
          ...session.user,
          verified: true,
        },
      });

      // Clear any existing intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Force refresh the session to ensure it's updated
      await fetchUpdatedUserDetails(session.user.id);

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/landing';
      }, 1500);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message);
    }
  };

  // const handleLogout = async () => {
  //   if (intervalRef.current) clearInterval(intervalRef.current);
  //   if (verified || session.user.verified) {
  //     console.log('verified at handlelogut', verified);
  //     window.location.href = '/landing';
  //     return;
  //   } else {
  //     if (session.user.verified) {
  //       console.log('verified at handlelogut', verified);
  //       alert(
  //         'Your account has been verified. You can now access your profile.'
  //       );
  //       window.location.href = '/profile';
  //       return;
  //     }
  //     alert('Your verification time has expired. Please sign up again.');
  //     await signOut();
  //   }
  // };

  const handleLogout = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (verified || session?.user?.verified) {
      window.location.href = '/landing';
      return;
    }
    if (!verified && !session?.user?.verified && timeLeft <= 0) {
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
        clearInterval(intervalRef.current); // Stop the interval if time expires
        handleLogout();
      } else {
        setTimeLeft(Math.round(diff / 1000));
      }
    }
  };

  async function getUserDetails(id) {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
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

  useEffect(() => {
    console.log('session', session);

    // If no user logged in, redirect to signup page
    if (!session) {
      console.log('reload');
      window.location.href = '/login';
    }
    if (session?.user?.verified) {
      console.log('verified at useeffect', session.user.verified);
      window.location.href = '/landing';
    }
    if (session?.user?.id) getUserDetails(session.user.id);

    // Make sure only one interval is running at a time
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = startResendCooldown();
    return () => clearInterval(intervalRef.current);
  }, [session]);

  useEffect(() => {
    if (expiresAt) {
      const timer = setInterval(updateTimer, 1000);
      // Cleanup timer on component unmount or when expiresAt changes
      return () => clearInterval(timer);
    }
  }, [expiresAt]); // Dependency array includes expiresAt to re-trigger countdown when it's updated

  function renderIndicator() {
    if (timeLeft === null) {
      return (
        <div className={styles.contentContainer}>
          {/* <h3 className={styles.verificationTitle}>Enter Verification Code</h3>
          <p className={styles.accountDeletionNotice}>
            We have sent a code to <strong>{userName}</strong>
            <br />
            Please verify your account within 48 hours <br />
            Enter received code to continue.
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
                  if (e.key === 'Backspace' && !token[index] && index > 0) {
                    e.preventDefault(); // preventing default backspace option
                    const prevInput = e.target.previousElementSibling;
                    if (prevInput) {
                      prevInput.focus();
                      prevInput.select();
                    }
                  }
                }}
                onInput={(e) => {
                  const nextInput = e.target.nextElementSibling; // find the next input field
                  if (nextInput && e.target.value) {
                    nextInput.focus(); // Move focus to the next input field
                  }
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ display: 'inline' }}>Didn't receive a code?</p>
            <span
              onClick={!resendDisabled ? resendVerificationEmail : undefined}
              className={
                resendDisabled ? styles.resendTextDisabled : styles.resendText
              }
              style={{
                cursor: resendDisabled ? 'default' : 'pointer',
                marginLeft: '10px',
              }}
            >
              {resendDisabled
                ? `Resend in ${cooldown} seconds`
                : 'Click to resend'}
            </span>
          </div> */}

          <h3 className={styles.verificationTitle}>Verification</h3>

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
    if (timeLeft > 0) {
      return (
        <div className={styles.contentContainer}>
          {/* <h3 className={styles.verificationTitle}>Enter Verification Code</h3>
          <p className={styles.accountDeletionNotice}>
            We have sent a code to <strong>{userName}</strong>
            <br />
            Please verify your account within 48 hours <br />
            Enter received code to continue.
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
                  if (e.key === 'Backspace' && !token[index] && index > 0) {
                    e.preventDefault(); // preventing default backspace option
                    const prevInput = e.target.previousElementSibling;
                    if (prevInput) {
                      prevInput.focus();
                      prevInput.select();
                    }
                  }
                }}
                onInput={(e) => {
                  const nextInput = e.target.nextElementSibling; // find the next input field
                  if (nextInput && e.target.value) {
                    nextInput.focus(); // Move focus to the next input field
                  }
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ display: 'inline' }}>Didn't receive a code?</p>
            <span
              onClick={!resendDisabled ? resendVerificationEmail : undefined}
              className={
                resendDisabled ? styles.resendTextDisabled : styles.resendText
              }
              style={{
                cursor: resendDisabled ? 'default' : 'pointer',
                marginLeft: '10px',
              }}
            >
              {resendDisabled
                ? `Resend in ${cooldown} seconds`
                : 'Click to resend'}
            </span>
          </div> */}

          <h3 className={styles.verificationTitle}>Verification</h3>

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
    <div className={styles.verifyContainer}>
      <div className={styles.topLeft}>
        <SignInLogo />
      </div>
      {renderIndicator()}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyEmail;

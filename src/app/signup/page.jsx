"use client";

import React, { useState } from "react";
// import styles from './page.module.css';

function Example() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [points, setPoints] = useState(0);

  const OnSignup = async () => {
    // signup function. This will call upon /api/users/signup
    // and send the username and password to the backend
    // if the signup is successful, redirect to the profile page
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
          firstName,
          lastName,
          email,
          points,
        }),
      });
      const data = await response.json();

      if (data.error) {
        // eslint-disable-next-line no-alert
        alert(data.error);
        throw new Error(data.error);
      } else {
        // log the user in after signing up
        const loginResponse = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        });
        const loginData = await loginResponse.json();

        if (loginData.error) {
          // eslint-disable-next-line no-alert
          alert(loginData.error);
          throw new Error(loginData.error);
        } else {
          // redirect to the profile page
          window.location.href = "/profile";
        }

        // eslint-disable-next-line no-console
        console.log("Login success", loginResponse.data);
      }

      // eslint-disable-next-line no-console
      console.log("Signup success", response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Signup failed", error.message);
    }
  };

  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const userNameChange = (e) => {
    setUserName(e.target.value);
  };
  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitLog = (event) => {
    event.preventDefault();
    let validEntries = true;

    // for email input format validation
    const regex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (firstName === "" || lastName === "") {
      // eslint-disable-next-line no-alert
      alert("Name is required!");
      validEntries = false;
      return;
    }
    if (!regex.test(email)) {
      // eslint-disable-next-line no-alert
      alert("Invalid email!");
      validEntries = false;
      return;
    }
    if (password === "") {
      // eslint-disable-next-line no-alert
      alert("Password is required!");
      validEntries = false;
      return;
    }
    if (password.length < 8) {
      // eslint-disable-next-line no-alert
      alert("Password needs to be at least 8 characters");
      validEntries = false;
      return;
    }
    if (confirmPassword !== password) {
      // eslint-disable-next-line no-alert
      alert("Password and confirm password fields need to match");
      validEntries = false;
      return;
    }
    if (validEntries) {
      OnSignup();
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="firstName">
          First name: <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={firstNameChange}
          />
        </label>
        <br />
        <label htmlFor="lastName">
          Last name:
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={lastNameChange}
          />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label type="eAddress">
          Email Address:
          <br />
          <input type="email" id="email" name="email" onChange={emailChange} />
          <br />
        </label>
        <label htmlFor="userName">
          Username:
          <br />
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={userNameChange}
          />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="pass">
          Password:
          <br />
          <input
            type="password"
            id="pass"
            name="pass"
            onChange={passwordChange}
          />
          <br />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label name="confirmPass">
          Confirm Password:
          <br />
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            onChange={confirmPasswordChange}
          />
          <br />
        </label>

        <input type="submit" value="Submit" onClick={submitLog} />
        <br />
      </form>
    </div>
  );
}
export default Example;

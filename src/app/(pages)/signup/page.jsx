"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("username");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  // Captcha Related
  const recaptcha = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const onCaptchaChange = (token) => {
    // Set the captcha token when the user completes the reCAPTCHA
    if (token) {
      setCaptchaToken(token);
    }
  };

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
          captchaToken,
        }),
      });
      const data = await response.json();
      if (data.error) {
        // eslint-disable-next-line no-alert
        alert(data.error);
        throw new Error(data.error);
      } else {
        // log the user in after signing up
        signIn("credentials", {
          username: email,
          password,
          callbackUrl: "/verifyemail",
        });
        console.log("Signup success", response.data);
        recaptcha?.current?.reset();
      }
      // eslint-disable-next-line no-console
      console.log("Signup success", response.data);
      recaptcha?.current?.reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Signup failed", error.message);
      // refresh the page to clear the form
      window.location.href = "/signup";
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
    setUserName(e.target.value);
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    <>
      <div className={styles.topLeft}>
        <Image src="/logo.svg" width={50} height={50} />
        <span>Global Green Scholar </span>
      </div>
      <div className={styles.exampleContainer}>
        <div className={styles.exampleImageContainer}>
          <Image
            src="/signupimage.png"
            alt="Sign Up Image"
            width={600}
            height={600}
            className={styles.alignImage}
          />
          <div className={styles.exampleGGtext}>
            Learn about sustainability with <br />{" "}
            <span className={styles.exampleGreenText}>Global Green</span> today
          </div>
        </div>
        <form className={styles.exampleForm} onSubmit={submitLog}>
          <h1 className={styles.exampleTitle}>Create your account</h1>
          <label htmlFor="firstName" className={styles.exampleLabel}>
            First name:
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={firstNameChange}
              className={styles.exampleInput}
            />
          </label>
          <label htmlFor="lastName" className={styles.exampleLabel}>
            Last name:
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={lastNameChange}
              className={styles.exampleInput}
            />
          </label>
          <label htmlFor="email" className={styles.exampleLabel}>
            Email Address:
            <input
              type="email"
              id="email"
              name="email"
              onChange={emailChange}
              className={styles.exampleInput}
            />
          </label>
          <label htmlFor="pass" className={styles.exampleLabel}>
            Password:
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="pass"
                name="pass"
                onChange={passwordChange}
                className={styles.exampleInput}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.passwordIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
          </label>
          <label htmlFor="confirmPass" className={styles.exampleLabel}>
            Confirm Password:
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPass"
                name="confirmPass"
                onChange={confirmPasswordChange}
                className={styles.exampleInput}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className={styles.passwordIcon}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </label>
          <div className={styles.center}>
            <div className={styles.centerCaptcha}>
              <div className="pb-20px">
                <ReCAPTCHA
                  size="normal"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onCaptchaChange}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Continue"
              className={styles.exampleSubmitButton}
            />

            <p className={styles.loginPrompt}>
              Already have an account?{" "}
              <a href="/login" className={styles.loginLink}>
                Sign In
              </a>
            </p>
            <hr></hr>
            <p className={styles.termsFont}>
              By continuing, you acknowledge that you have read and understood,
              and agree to Global Green’s Terms & Conditions and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;

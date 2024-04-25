'use client'
import React, { useState } from 'react';
import styles from './page.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState(''); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const generatePassword = () => {
        const length = Math.random() > 0.5 ? 8 : Math.floor(Math.random() * (15 - 9 + 1)) + 9;
        let password = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";

        for (let i = 0; i < length; i++) {
            if (length === 8) {
                const chars = letters + numbers;
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
                password += letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
        return password;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPassword = generatePassword();
        console.log('New Password:', newPassword);
        console.log('Submit forgot password form for:', email);
    };

    return (
        <div className={styles.forgotPasswordContainer}>
            <h1 className={styles.title}>Forgot Password?</h1>
            <p className={styles.resetInstructions}>We will send you reset instructions</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="email" className={styles.label}>
                    Email:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.input}
                        placeholder="Enter your email address"
                    />
                </label>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>Reset Password</button>
                </div>   
                <a href= "/login" className={styles.backToLogin}> Back to login</a>         
            </form>
        </div>
    );
}

export default ForgotPassword;

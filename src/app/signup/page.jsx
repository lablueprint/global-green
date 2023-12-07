'use client'

// to do: password hidden and required username, password
import React, { useState, useEffect, Button } from 'react';
import styles from './page.module.css';
import { bool } from 'prop-types';
function Example() {
  // function validate(){
  //   console.log('validate')
  //   const email = document.getElementById('email').value
  //   const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  //   if(regex.test(email)) {
  //     alert("Valid email!")
  //   } else {
  //     alert("Invalid email!")
  //   }
  // }
  var accounts = {};
  accounts = {
    "fname": "testing",
    "lname": "testing",
    "username": "testing",
    "password": "testing",

}
  const fnameChange = (e) => {
    setFName(e.target.value);
  };
  const lnameChange = (e) => {
    setLName(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submitLog = (event) =>  {
    event.preventDefault();
    var validEntries = true;
    const email = document.getElementById('email').value
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if(fname == '' || lname == ''){
      alert("Name is required!");
      validEntries = false;
    }
    if(!regex.test(email)) {
      alert("Invalid email!");
      validEntries = false;
    } 
    if(password == ''){
      alert("Password is required!");
      validEntries = false;
    }
    if(password.length < 8){
        alert("Password needs to be at least 8 characters");
        validEntries = false;
    }
    if(confirmPassword != password){
      alert("Password and confirm password fields need to match");
      validEntries = false;
    }
    //  if(password != confirmPassword || password.length < 8){
    // if(password.localeCompare(confirmPassword) != 0 || password.length < 8){
    //   alert("Password and confirm password fields need to match");
    //   validEntries = false;
    // } 
    
    if(validEntries == true){
      accounts.fname = fname;
      accounts.lname = lname;
      accounts.username = username;
      accounts.password = password;
      console.log(accounts);
    }
  }
  return (
    <div>
      <form >
        <label for="fname">First name:</label> <br></br>
        <input type="text" id="fname" name="fname"onChange={fnameChange} /><br></br>
        <label for="lname">Last name:</label><br></br>
        <input type="text" id="lname" name="lname"onChange={lnameChange} /><br></br>
        <label type ="eAddress">Email Address:</label><br></br>


      <input type="email" id="email" name="email"  onChange={usernameChange} required /><br></br>
       {/* <input type="submit" value="Submit" />  */}
      
        


        {/* <input type="text" id="eAddress" name="eAddress" onChange={usernameChange} /><br></br> */}
        {/* <input type="email" id="email" name="eAddress" pattern=".+@example\.com" onChange={usernameChange} required /><br></br> */}
        <label name ="pass">Password:</label><br></br>
        <input type="password" id="pass" name="pass" onChange={passwordChange}/><br></br>
        <label name ="confirmPass">Confirm Password:</label><br></br>
        <input type="password" id="confirmPass" name="confirmPass"onChange={confirmPasswordChange} /><br></br>
        {/* <input type="submit" value="Submit" onClick={submitLog} /><br></br> */}
        <input type="submit" value="Submit" onClick={submitLog}/><br></br>
      </form>
    </div>
  );
}
export default Example;
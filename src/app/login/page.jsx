'use client'
import React, { useState, useEffect, Button } from 'react';
import styles from './page.module.css';

function Example() {



  var accounts = {
    "username": "testing",
    "password": "testing"
}



  


  // accounts = {
  //   "megan":"taruni",
  //   "taruni":"megan"
  // };


  const usernameChange = (e) => {
    setUsername(e.target.value);
    // accounts.username = username; 
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    // accounts.password = password; 

  }


  

  
	
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitLog = (event) =>  {
    event.preventDefault();

    // setPassword(accounts.password);
    // setUsername(accounts.username);
    if(username == '' || password == ''){
      alert("Input a username and/or password!!!");
    }else{
      //accounts["username"] = username;
    
      accounts.username = username;
      accounts.password = password;
      console.log(accounts);
    
    }


  
  }
  return (
    <div>
      <form >
        <label type ="eAddress">Email Address:</label>
        
        <input type="text" id="eAddress" name="eAddress" onChange={usernameChange} />
        <label name ="pass">Password:</label>
        <input type="password" id="pass" name="pass" onChange={passwordChange} />
        {/* <input type="email" id="email" name="email" required />
        <input type="submit" value="Submit" /> */}
        <button type="submit" onClick={submitLog}>Submit</button>
      </form>

    </div>
  );
  
}

export default Example;

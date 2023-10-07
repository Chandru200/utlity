import React, { useState } from "react";
import Input from "./Input";
import { notifyBackgroundPage } from "./../message";
export default function Login({ loginError, setSignIn, signin }) {
  const [loginDetails, setLoginDetails] = useState();
  const handleLogin = () => {
    setSignIn(!signin);
  };
  const login = () => {
    notifyBackgroundPage("login", loginDetails);
  };
  const register = () => {
    notifyBackgroundPage("register", loginDetails);
  };

  return (
    <div className="sign-in">
      <h2>{`${signin ? "Sign in" : "Sign up"} to Continue`}</h2>
      <div className="getdetails">
        {!signin && (
          <Input
            name="text"
            label="Fullname"
            placeholder="Enter your name"
            required={true}
            ChangeParentState={setLoginDetails}
            ParentState={loginDetails}
          />
        )}
        <Input
          name="email"
          label="Email"
          placeholder="Enter Your Email"
          required={true}
          ChangeParentState={setLoginDetails}
          ParentState={loginDetails}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Enter Your Password"
          required={true}
          ChangeParentState={setLoginDetails}
          ParentState={loginDetails}
        />
      </div>
      <div className="sign-container">
        {signin ? (
          <>
            <button onClick={login}>Sign In</button>
            <p>
              Dont have an account? <u onClick={handleLogin}>Sign Up</u>
            </p>
          </>
        ) : (
          <>
            <button onClick={register}>Sign Up</button>
            <p>
              Already have an account? <u onClick={handleLogin}>Sign In</u>
            </p>
          </>
        )}
        <div className="error">{loginError}</div>
      </div>
    </div>
  );
}

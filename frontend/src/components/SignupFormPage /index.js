import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.signUp({email, username, password}))
                .catch(async (res) =>{
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                })
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
      <>
        <div className="divBorder">
          <div className="textSign">
            <h1>Sign up
            </h1>
            <p className="textUnderSign">it's quick and easy.</p>
            <hr/>
          </div>
          <form className="signupButton" onSubmit={handleSubmit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
              <div className="signUpFormInputUserDiv">
                <label>
                  <label>
                    <input className="signUpFormInputUser" type="text" value={username} placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} required/>
                  </label>
                  <input className="signUpFormInputUser" type="text" value={email} placeholder="Email" onChange={(e) =>
                  setEmail(e.target.value)} required/>
                </label>
              </div>
            <label>
              <input className="signUpFormInput" type="password" value={password} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <label>
              <input className="signUpFormInput" type="password" value={confirmPassword} placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)} required/>
            </label>
            <br/>
            <p className="dontSueText">
              People who use our service may have uploaded your contact information to Facebook. Learn more.
            </p>
            <p className="dontSueText2">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive
              SMS Notifications from us and can opt out any time.
            </p>
              <button className="signupButton" type="submit">Sign Up</button>
            </form>
          </div>
        </>
    );
}

export default SignupFormPage

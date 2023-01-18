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
        <form className="signup" onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>
          <label>
            <input className="input" type="text" value={username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} required/>
          </label>
          <br/>
          <br/>
            <input className="input" type="text" value={email} placeholder="Email" onChange={(e) =>
            setEmail(e.target.value)} required/>
          </label>
          <br/>
          <br/>
          <label>
            <input className="input" type="password" value={password} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} required/>
          </label>
          <br/>
          <br/>
          <label>
            <input className="input" type="password" value={confirmPassword} placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </label>
          <br/>
          <br/>
          <button className="signup" type="submit">Create new account</button>
        </form>
    );
}

export default SignupFormPage

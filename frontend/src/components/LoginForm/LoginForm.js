import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import SignUpFormModal from "../SignUpFormModal";
import "./LoginForm.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };


  const setDemo = () => {
    setCredential(`demo@user.io`);
    setPassword(`password`);
  }

  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser){
    return (
      <>
        <h1 className="metabook">Metabook</h1>
        <h5 className="connect">Connect with friends and the world around you on Metabook.</h5>
    <form className="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        <input className="username" type="text" value={credential} placeholder="Username or Email"
        onChange={(e) => setCredential(e.target.value)} required/>
      </label>
      <br/>
      <br/>
      <label>
        <input className="username" type="password" value={password} placeholder="password"
        onChange={(e) => setPassword(e.target.value)} required/>
      </label>
      <br/>
      <br/>
      <button className="log_in" type="submit">Log In</button>
      <br/>
      <br/>
      <button className="log_in" onClick={()=>setDemo()}> Log in as a demo user?</button>
    </form>
      <br/>
      <SignUpFormModal/>
    </>
  );
  } else {
    return <Redirect to="/newsFeed"/>
  }
}

export default LoginForm;

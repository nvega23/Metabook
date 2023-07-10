import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import SignUpFormModal from "../SignUpFormModal";
import "./LoginForm.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [documentTitle, setDocumentTitle] = useState("metabook - log in or sign up");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    document.title = documentTitle;
  }, [documentTitle])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        document.title = 'Metabook'
      })
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
      <div className="splashPage">
        <div className="splashPageText">
          <h1 className="metabook">metabook</h1>
          <p className="connect">Connect with friends and the world around you on Metabook.</p>
        </div>
      <div className="borderLoginForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>
            <input
              className={errors.length ? "LoginFormUsernameError" : "LoginFormUsername"}
              type="text"
              value={credential}
              placeholder="Email or Username"
              onChange={(e) =>
              setCredential(e.target.value)}
              required
              />
          </label>

          <div className="ErrorLoginPage">
          {errors.map(error => {
            console.log(error);
            return (
              <div key={error}>
                <div className="errorImgContainer">
                  <img class="_9ay6" src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/O287_AcFyg4.png" alt="" width="20" height="20" />
                </div>
                <h1 className="errorTextLoginPage">The email or mobile number you entered isn’t connected to an account.
                  &nbsp;
                <strong>Please try again.</strong>
              </h1>
              </div>
            );
          })}
          </div>

          <label>
            <input
            className={errors.length ? "LoginFormPasswordError" : "LoginFormPassword"}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </label>

          <br/>
          <button className="log_in" type="submit">Log In</button>
          <br/>
          <button className="demo" onClick={()=>setDemo()}>
            <b>
              Log in as a demo user
            </b>
          </button>
          <hr className="lineBreak"/>
          <div className="">
            <SignUpFormModal/>
          </div>
        </form>
        <div>
        <p className="formText">
          <b>
            Create a Page &nbsp;
          </b>
          for a celebrity, brand or business.
          </p>
      </div>
        </div>
    </div>
      <div className="footers">
        <p className="languages">
          <a className="aboutLinks" target="_blank" href="https://twitter.com/nvega24">Twitter</a> |
          <a className="aboutLinks" target="_blank" href="https://angel.co/u/nestorvega23"> AngelList </a> |
          <a className="aboutLinks" target="_blank" href="https://www.linkedin.com/in/nestor-vega-233b43238/"> Linkedin </a> |
          <a className="aboutLinks" target="_blank" href="https://github.com/nvega23">Github</a> |
          React.js | JavaScript (ES6) | Ruby |
          Ruby on Rails | MongoDB | Render | AWS
        </p>
      </div>
    </>
  );
  } else {
    return (
      <>
        <Redirect to="/newsFeed"/>
      </>
    )
  }
}

export default LoginForm;

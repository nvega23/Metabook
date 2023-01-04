import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage ";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./components/homepage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupFormPage />

          </Route>
          <Route path="/HomePage">
            <HomePage />
          </Route>
        </Switch>
    </>
  );
}
// postindexpage
export default App;

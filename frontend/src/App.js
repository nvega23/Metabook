import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./components/homepage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
    </>
  );
}

export default App;

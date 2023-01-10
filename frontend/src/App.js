import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./components/profilePage";
import profilePage from "./components/profilePage";
import NewsFeed from "./components/newsfeed";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/newsFeed">
            <NewsFeed/>
          </Route>
          <Route path="/profilePage">
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

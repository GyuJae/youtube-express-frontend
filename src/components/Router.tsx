import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import VideoDetail from "../pages/VideoDetail";
import Header from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/watch/:id">
          <VideoDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

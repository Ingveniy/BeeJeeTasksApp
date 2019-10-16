import React from "react";
import "antd/dist/antd.css";
import "./app.css";
import { Switch, Route } from "react-router-dom";
import Header from "../header";
import { Login, Tasks, TaskForm } from "../pages";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Tasks} exact />
        <Route path="/tasks/:id" component={TaskForm} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;

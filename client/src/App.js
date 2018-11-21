import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FolderChangesContainer from './components/FolderChangesContainer'
import AuthLayer from './components/AuthLayer'
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/" exact component={AuthLayer(FolderChangesContainer)} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

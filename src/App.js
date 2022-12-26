import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import React, { Component } from 'react'
import NavBar from './components/Navbar';
import News from './components/News';

export default class App extends Component {

  apiKey = "bdb1625272bc475d862bd3f3a49a1633";
  pageSize = 15;
  render() {
    return (
      <div>
      <Router>
      <NavBar />
      <Switch>
          <Route exact path="/business">
            <News key="/business" pageSize={this.pageSize} country = {"in"} category={"business"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/entertainment">
            <News key="/entertainment" pageSize={this.pageSize} country = {"in"} category={"entertainment"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/health">
            <News key="/health" pageSize={this.pageSize} country = {"in"} category={"health"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/science">
            <News key="/science" pageSize={this.pageSize} country = {"in"} category={"science"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/sports">
            <News key="/sports" pageSize={this.pageSize} country = {"in"} category={"sports"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/technology">
            <News key="/technology" pageSize={this.pageSize} country = {"in"} category={"technology"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/general">
            <News key="/general" pageSize={this.pageSize} country = {"in"} category={"general"} apiKey={this.apiKey}/>
          </Route>
          <Route exact path="/">
            <News key="/general" pageSize={this.pageSize} country = {"in"} category={"general"} apiKey={this.apiKey}/>
          </Route>
      </Switch>
      </Router>
      </div>
    )
  }
}
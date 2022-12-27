import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'
import NavBar from './components/Navbar';
import News from './components/News';

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 15;
  const [progress, setProgress] = useState(0)

    return (
      <div>
      <Router>
      <NavBar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Switch>
          <Route exact path="/business">
            <News setProgress={setProgress} key="/business" pageSize={pageSize} country = {"in"} category={"business"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} key="/entertainment" pageSize={pageSize} country = {"in"} category={"entertainment"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} key="/health" pageSize={pageSize} country = {"in"} category={"health"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} key="/science" pageSize={pageSize} country = {"in"} category={"science"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} key="/sports" pageSize={pageSize} country = {"in"} category={"sports"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} key="/technology" pageSize={pageSize} country = {"in"} category={"technology"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} key="/general" pageSize={pageSize} country = {"in"} category={"general"} apiKey={apiKey}/>
          </Route>
          <Route exact path="/">
            <News setProgress={setProgress} key="/general" pageSize={pageSize} country = {"in"} category={"general"} apiKey={apiKey}/>
          </Route>
      </Switch>
      </Router>
      </div>
    )
  }

  export default App
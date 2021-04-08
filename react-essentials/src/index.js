import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import View from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  React.createElement("h1",{style:{color:'blue'}},"FIRST REACT APP"),
  document.getElementById('root'));

ReactDOM.render(
  <Router>
    <View cpp={true} username="parasbabbar1612">
      <p>I JUST WANT TO MAKE IT BIG ONEDAY!</p>
    </View>
  </Router>,
  document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

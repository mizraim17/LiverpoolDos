import React, {Component} from 'react';

import './App.css';
import Home from "./Component/Home";
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

class App extends Component {

  componentWillMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }

}


export default App;

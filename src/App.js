import { Component } from "react";

import Tasks from "./components/Tasks";
import "./App.css";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="app-bg-container">
        <div className="side-bar"></div>
        <div className="right-bg-container">
          <nav className="nav-bar"></nav>
          <div className="content-bg-container">
            <h1 className="test-heading">Test</h1>
            <a className="website-link">Sloovi.com</a>
            <p className="add-description-para">Add description,</p>
            <Tasks />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

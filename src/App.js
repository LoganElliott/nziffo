import React, { Component } from "react";
import "./App.css";
import Input from "./input";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">New Zealand Film Festival Organiser</h1>
        <Input />
      </div>
    );
  }
}

export default App;

//standard dependencies
import React, { Component } from 'react'
//logo
import Logo from './images/logo_transparent.png'

//style logo
const logoStyle = {
  maxHeight: '500px'
}

//App Component
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={Logo} className="App-logo" alt="logo" style={logoStyle}/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

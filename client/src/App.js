//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Segment, Container } from 'semantic-ui-react'
//components-- some will be repalced by pages that include these components
import Footer from './components/Footer'
import Header from './components/Header'
//pages


//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef'
}

//App Component
class App extends Component {
  render() {
    return (
      <div className="App" style={backgroundStyle}>
        <Header />
        <p className="App-intro">
          Maybe include an about section/welcome explanation no homepage with a button to sign up?
        </p>
      <Footer />
      </div>
    );
  }
}

export default App;

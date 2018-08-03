//react imports
import React, { Component } from 'react'
//loading icon
import Loading from '../images/loading.gif'
//semantic imports
import { Image } from 'semantic-ui-react'

class Callback extends Component {
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }
    return(
      <div style={style}>
        <Image src={Loading} alt='loading' centered/>
      </div>
    )
  }
}

export default Callback

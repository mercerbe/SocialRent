//standard dependencies
import React, { Component } from 'react'
//menu component
import { Menu } from 'semantic-ui-react'

//style to fit header
const menuStyle = {
  backgroundColor: '#065471',
  border: 'none'
}

//export class
export default class TopMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={menuStyle} inverted pointing secondary stackable>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          content='Home'
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>

        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          content='Login'
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          content='Signup'
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='dashboard'
          active={activeItem === 'dashboard'}
          content='Dashboard'
          onClick={this.handleItemClick}
        />
      </Menu.Menu>
      </Menu>
    )
  }
}

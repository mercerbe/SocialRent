//standard dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//semantic components component
import { Menu, Visibility, Button, Responsive } from 'semantic-ui-react'

//style to fit header
const menuStyle = {
  backgroundColor: '#065471',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
}
//style for menu fixed
const fixedMenuStyle = {
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}



//export TopMenu
export default class TopMenu extends Component {

  //start with menu not fixed
  state = {
    menuFixed: false
  }
  //stick or unstick menu
  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, menuFixed } = this.state

    return (
      <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
      <Menu style={menuFixed ? fixedMenuStyle : menuStyle} fixed={'top'} inverted pointing secondary>
        <Link to='/'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          content='Home'
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to='/market'>
        <Menu.Item
          name='market'
          active={activeItem === 'market'}
          content='Market'
          onClick={this.handleItemClick}
        />
      </Link>
      <Link to='/dashboard'>
        <Menu.Item
          name='dashboard'
          active={activeItem === 'dashboard'}
          content='Dashboard'
          onClick={this.handleItemClick}
        />
      </Link>
      <Menu.Item position='right'>
        <Link to='/login'>
          <Button inverted>Log in</Button>
        </Link>
        <Link to='/signup'>
          <Button style={{marginLeft: '0.2em'}} inverted>Sign up</Button>
        </Link>
      </Menu.Item>
      </Menu>
    </Visibility>
    )
  }
}

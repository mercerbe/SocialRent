//imports
import React, { Component } from 'react'
import { Container, Segment, Button, Menu } from 'semantic-ui-react'
//import Auth0 -- login from Auth0 form
import auth from '../../Auth'

//class component
export default class Auth0Login extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    //looking for authentication from Auth0
    const { isAuthenticated } = this.props.auth

    return (
      <div>
        <Menu fluid>
          <Menu.Header>
            <Menu.Brand>
              <a href="#">Auth0 - React</a>
            </Menu.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Menu.Header>
        </Menu>
      </div>
    );
  }
}

//export default Auth0Login

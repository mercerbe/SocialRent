//imports
import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
//import Auth0 from Auth
import auth from '../../Auth/Auth.js'

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

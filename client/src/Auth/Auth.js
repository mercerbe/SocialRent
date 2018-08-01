import React from 'react'
import history from '../history'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'

//login will return:
//access_token, id_token, and expires_in -- these are what we can use to manage auth/login

export default class Auth {
  //Create new login
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })

  //constructor defines properites/functions of Auth0
  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  //Call login authorization
  login() {
    this.auth0.authorize();
  }

  //Handle login using Auth0 parse hash method
  //if authenticated, route to dashboard (todo-route for :id) else route back to login
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/home')
      } else if (err) {
        history.replace('/home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 10000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the main route
    history.replace('/')
  }

  logout() {
    // Clear access/Id tokens
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the main route
    history.replace('/')
  }

  isAuthenticated() {
    // Check expiration time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

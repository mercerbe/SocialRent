export default class Storage {
  static setToken(token) {
    sessionStorage.setItem('token', token)
  }
  static getToken() {
    return sessionStorage.getItem('token')
  }
}

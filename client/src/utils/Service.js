import axios from 'axios'
import Storage from './Storage'

function formattedToken() {
  return `Bearer ${Storage.getToken()}`
}

export default class Service {

  static get(url) {
    return axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: formattedToken()
      }
    })
  }
  static post(url, data) {
    const req = axios.post(url, data, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: formattedToken()
      }
    });
    return req
  }
}

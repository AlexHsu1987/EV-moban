// import api from 'api/connom'
import { httpGet } from '../utils/request'
// import { author, name } from '../../../package.json'

export default {
  getVersionInfo(state, retryNum = 0) {
    return new Promise((resolve, reject) => {
      httpGet('https://raw.githubusercontent.com/AlexHsu1987/EV-moban/master/publish/version.json', {
        timeout: 20000,
      }, (err, resp, body) => {
        if (err) {
          return ++retryNum > 3
            ? this.dispatch('getVersionInfo2').then(resolve).catch(reject)
            : this.dispatch('getVersionInfo', retryNum).then(resolve).catch(reject)
        }
        resolve(body)
      })
    })
  },
  getVersionInfo2(state, retryNum = 0) {
    return new Promise((resolve, reject) => {
      httpGet('https://raw.githubusercontent.com/AlexHsu1987/EV-moban/master/publish/version.json', {
        timeout: 20000,
      }, (err, resp, body) => {
        if (err) {
          return ++retryNum > 3
            ? reject(err)
            : this.dispatch('getVersionInfo2', retryNum).then(resolve).catch(reject)
        }
        resolve(body)
      })
    })
  },
}

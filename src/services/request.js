import _ from 'lodash'
import { REST_URL } from '../httpConfig'

const parse = async res => await res.json()

const request = async (path, options = {}) => {
  const url = REST_URL + path
  options = _.merge({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, options)

  options.body = options.body && options.body || JSON.stringify(options.data)
  delete options.data
  const datas = await fetch(url, options)
  const json = await parse(datas)
  return json
}

export const post = (path, options) => {
  options.method = 'POST'
  return request(path, options)
}

export const get = (path, options) => {
  options.method = 'GET'
  return request(path, options)
}

export default request
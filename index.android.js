import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { AppRegistry, Text, View, Navigator } from 'react-native'

import reducers from './src/reducers'
import finalCreateStore from './src/store'  //引入store配置
import Routes from './src/routes'

const store = finalCreateStore(reducers)

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)

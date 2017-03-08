import React, {Component} from 'react'
import { connect } from 'react-redux'
import { AppRegistry, Text, View, Navigator, TouchableHighlight } from 'react-native'
import _ from 'lodash'

import Auth from './containers/auth/auth'
import Home from './containers/home/home'
import Detail from './containers/detail/detail'

let index = 0
const routes = {
  'Auth': Auth,
  'Home': Home,
  'Detail': Detail
}

const renderScene = (route, navigator) => {
  const Component = routes[route.name]
  const back = () => {
    if (_.isFunction(Component.onRouteBack)) {
      if (Component.onRouteBack() === false) {
        return
      }
    }
    navigator.pop()
    index ++
  }
  navigator.push = _.wrap(navigator.push, (func, args) => {
    if (_.isFunction(Component.onRoutePush)) {
      if (Component.onRoutePush() === false) {
        return _.noop
      }
    }
    return func(args)
  })
  return (
    <View>
      {
        route.name !== 'Auth' &&
        <TouchableHighlight
          underlayColor="white"
          onPress={back}>
          <Text style={{color: '#108ee9', fontSize: 20}}>&lt; Back</Text>
        </TouchableHighlight>
      }
      <Component navigator={navigator} params={route.params}  routeIndex={index}/>
    </View>
  )
}


const Routes = () => {
  const configureScene = (route) => {
    return Navigator.SceneConfigs.FadeAndroid
  }



  return (
    <Navigator
      initialRoute={{name: 'Auth'}}
      configureScene={configureScene}
      renderScene={renderScene} />
  )
}

export default connect()(Routes)
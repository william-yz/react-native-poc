import React, {Component} from 'react'
import { connect } from 'react-redux'
import { AppRegistry, Text, View, Navigator, TouchableHighlight } from 'react-native'


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
    navigator.pop()
    index ++
  }
  return (
    <View>
      {
        route.name !== 'Auth' &&
        <TouchableHighlight
          onPress={back}>
          <Text style={{color: 'blue'}}>&lt; Back</Text>
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
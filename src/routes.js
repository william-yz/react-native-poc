import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene } from 'react-native-router-flux'
import { WhiteSpace } from 'antd-mobile'

import Auth from './containers/auth/auth'
import Home from './containers/home/home'
import Detail from './containers/detail/detail'

const routes = [
  {
    key: 'auth',
    component: Auth,
    title: '登录',
    initial: true
  }, {
    key: 'home',
    component: Home,
    title: '日报列表'
  }, {
    key: 'detail',
    component: Detail,
    title: '编辑日报'
  }
]

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        {routes.map(route => <Scene {...route}/>)}
      </Scene>
    </Router>
  )
}

export default connect()(Routes)
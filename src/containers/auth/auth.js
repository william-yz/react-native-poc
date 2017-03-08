import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { Toast } from 'antd-mobile'

import LoginPanel from '../../components/auth/LoginPanel'
import request from '../../services/request'


const login = (navigator, dispatch) => async (user) => {
  Toast.loading('登录中...')
  const result = await request('/runtime/business/auth/login', {
    method: 'POST',
    data: {
      type:'0',
      target:'/',
      ...user
    }
  })
  Toast.hide()
  if (result.result.status === '0000') {
    dispatch({
      type: 'SET_AUTH',
      payload: {
        token: result.result.token,
        userUid: result.result.uid
      }
    })
    navigator.push({name: 'Home'})
  } else {
    Toast.fail('用户名或密码错误.', 0.5)
  }
}

const Auth = ({ navigator, dispatch }) => {
  return (
    <LoginPanel loginHandler={login(navigator, dispatch)}/>
  )
}

export default connect()(Auth)
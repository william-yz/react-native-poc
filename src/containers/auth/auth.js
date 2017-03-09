import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Toast from 'antd-mobile/lib/toast'
import { Actions } from 'react-native-router-flux'

import LoginPanel from '../../components/auth/LoginPanel'
import request from '../../services/request'


const login = (dispatch) => async (user) => {
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
    Actions.home()
  } else {
    Toast.fail('用户名或密码错误.', 0.5)
  }
}

const Auth = ({ dispatch }) => {
  return (
    <LoginPanel loginHandler={login(dispatch)}/>
  )
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired
}
export default connect()(Auth)
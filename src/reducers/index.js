// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers

import auth from './auth/authReducer'

export default combineReducers({
  auth
})

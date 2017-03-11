


const REDUCERS = {
  ['SET_AUTH'] (state, { token, userUid }) {
    return {...state, token, userUid }
  },
  ['SET_USER'] (state, user) {
    return {...state, user}
  }
}


const reducer = (state = {
  token: '',
  userUid: '',
  user: {
    id: '',
    value: ''
  }
}, action) => {
  return REDUCERS[action.type] && REDUCERS[action.type](state, action.payload) || state
};

export default reducer
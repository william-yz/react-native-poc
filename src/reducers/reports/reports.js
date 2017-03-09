


const actions = {
  ['UPDATE_REPORTS'] (state, reportList) {
    return {...state, reportList }
  }
}


const reducer = (state = {
  reportList: []
}, action) => {
  return actions[action.type] && actions[action.type](state, action.payload) || state
};

export default reducer
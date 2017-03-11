


const REDUCERS = {
  ['UPDATE_REPORTS'] (state, reportList) {
    return {...state, reportList }
  }
}


const reducer = (state = {
  reportList: []
}, action) => {
  return REDUCERS[action.type] && REDUCERS[action.type](state, action.payload) || state
};

export default reducer
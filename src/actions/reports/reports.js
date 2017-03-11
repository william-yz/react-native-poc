import { post } from '../../services/request'
import _ from 'lodash'
import moment from 'moment'

export const getReportListAction = async (token, userUid) => {
  const datas = await post('/runtime/business/data/plugin/CZCJ0009', {
    headers: {
      Authorization: token
    },
    data: {
      "data": [
        {
          "main": {
            "boID": "9b39338c-e299-4dbc-9704-d834393c8721", 
            "boName": "BH_GZBGXQY"
          }, 
          "sub": { }, 
          "where": [ ], 
          "limit": {
            "$no": 1, 
            "$size": 10
          }
        }
      ], 
      "appID": "b7871793-db8f-48b7-b6e9-014504232f5a", 
      "uid": userUid
    }
  })
  if (datas.status === 0) {
    const records = _.map(datas.result[0].data, data => {
      return {
        id: data['BH_GZBGXQY.id'],
        extra: moment(parseInt(data['BH_GZBGXQY.BH_GZBGXQYBGRQ'])).format('YYYY-MM-DD'),
        user: _.get(data, ['BH_GZBGXQY.BH_GZBGXQYBGR']),
        row: data
      }
    })
    return {type: 'UPDATE_REPORTS', payload: records}
  }
}
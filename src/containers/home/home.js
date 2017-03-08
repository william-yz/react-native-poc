import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { List, DatePicker, Button, Toast } from 'antd-mobile'
import { post } from '../../services/request'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      datas: [],
      total: 0,
      createAbled: false
    }
  }

  async getUser () {
    const result = await post('/runtime/business/data/plugin/CZCJ0016', {
      headers: {
        Authorization: this.props.token
      },
      data: {
        appID: "b7871793-db8f-48b7-b6e9-014504232f5a", 
        uid: this.props.userUid, 
        data: [
          {
            refBoID: "720964f0-ccf9-4d54-f019-d3fbd8f7480e", 
            refBoFieldID: "35cb4b5c-ae0a-4173-a9d1-18b5585fd7b4", 
            boID: "9b39338c-e299-4dbc-9704-d834393c8721", 
            fieldID: "f6be8394-66a0-4814-8b6d-3ea68c917050"
          }
        ]
      }
    })
    if (result.status === 0) {
      this.props.setGlobalUser(result.result[0])
      this.setState({
        ...this.state,
        createAbled: true
      })
    }
  }

  async getReportList () {
    const datas = await post('/runtime/business/data/plugin/CZCJ0009', {
      headers: {
        Authorization: this.props.token
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
        "uid": this.props.userUid
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
      this.setState({
        datas:  records
      })
    }
  }

  componentDidMount () {
    // this.getReportList()
    this.getUser()
  }

  goDetail (isUpdate) {
    return (record) => {
      this.props.navigator.push({
        name: 'Detail',
        params: {
          record,
          isUpdate
        }
      })
    }
  }
  async componentWillReceiveProps () {
    Toast.loading('读取中')
    await this.getReportList()
    Toast.hide()
  }
  render () {
    return (
      <List renderHeader={() => '日报列表'}>
        <List.Item
          extra={<Button type="primary" size="small" disabled={!this.state.createAbled} onClick={this.goDetail(false).bind(this, {})} inline>新建</Button>}>
        </List.Item>
        {this.state.datas.map(record => {
          return (
            <List.Item
              key={record.id}
              extra={record.extra}
              onClick={this.goDetail(true).bind(this, record.row)}>
              {record.user.value}
            </List.Item>
          )
        })}
      </List>
    )
  }
}

export default connect(({ auth: { token, userUid, user }}) => {
  return { token, userUid, user }
}, (dispatch) => {
  return {
    setGlobalUser: (user) => dispatch({type: 'SET_USER', payload: user})
  }
})(HomePage)
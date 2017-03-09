import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { Keyboard } from 'react-native'

import { getReportListAction } from '../../actions/reports/reports'
import { List, DatePicker, Button, Toast, WhiteSpace } from 'antd-mobile'
import { post } from '../../services/request'


class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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

  getReportList () {
    this.props.updateList(getReportListAction(this.props.token, this.props.userUid))
  }

  componentDidMount () {
    Keyboard.dismiss()
    this.getReportList()
    this.getUser()
  }

  goDetail (isUpdate) {
    return (record) => {
      Actions.detail({
        record,
        isUpdate
      })
    }
  }

  render () {
    return (
      <List>
        <List.Item
          extra={<Button type="primary" size="small" disabled={!this.state.createAbled} onClick={this.goDetail(false).bind(this, {})} inline>新建</Button>}>
        </List.Item>
        {this.props.reportList.map(record => {
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

HomePage.propTypes = {
  token: PropTypes.string.isRequired,
  userUid: PropTypes.string.isRequired,
  setGlobalUser: PropTypes.func.isRequired,
  reportList: PropTypes.arrayOf(PropTypes.object).isRequired
}
const mapStateToProps = ({
  auth: { token, userUid },
  reports: {  reportList }
}) => {
  return {
    token,
    userUid,
    reportList
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    setGlobalUser: (user) => dispatch({type: 'SET_USER', payload: user}),
    updateList: dispatch
  }
})(HomePage)
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, DatePicker, TextareaItem, Button, Toast } from 'antd-mobile'
import moment from 'moment'
import _ from 'lodash'

import { post } from '../../services/request'
class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayRecord: {
        reporter: this.props.user.value,
        reportDate: moment(),
        content: ''
      }
    }
  }
  
  async componentDidMount () {
    if (this.props.params.isUpdate) {
      const displayRecord = {
        reporter: _.get(this.props.params.record, ['BH_GZBGXQY.BH_GZBGXQYBGR', 'value']),
        reportDate: moment(parseInt(_.get(this.props.params.record, ['BH_GZBGXQY.BH_GZBGXQYBGRQ']))),
        content: _.get(this.props.params.record, ['BH_GZBGXQY.BH_GZBGXQYJRZJ'])
      }
      this.setState({
        displayRecord
      })
    }
  }

  inputContent(content) {
    this.setState({
      displayRecord: {
        ...this.state.displayRecord,
        content
      }
    })
  }

  async save () {
    const record = this.props.params.record
    const now = moment().toDate().getTime()  + ''
    const boFields = {
      BH_GZBGXQYBGRQ: this.state.displayRecord.reportDate.toDate().getTime() + '', 
      BH_GZBGXQYTJSJ: now, 
      BH_GZBGXQYJRZJ: this.state.displayRecord.content, 
      BH_GZBGXQYMRJH: "", 
      BH_GZBGXQYBGR: this.props.user, 
      BH_GZBGXQYXGR: this.props.user
    }
    if (this.props.params.isUpdate) boFields.id = record['BH_GZBGXQY.id']
    const result = await post('/runtime/business/data/plugin/CZCJ0011', {
      headers: {
        Authorization: this.props.token
      },
      data: {
        appID: "b7871793-db8f-48b7-b6e9-014504232f5a", 
        data: [
          {
            main: {
              boID: "9b39338c-e299-4dbc-9704-d834393c8721", 
              boName: "BH_GZBGXQY", 
              boFields
            }, 
            subs: [ ]
          }
        ], 
        uid: this.props.userUid
      }
    })
    if (result.status === 0) {
      if (!this.props.params.isUpdate) {
        _.set(record, 'BH_GZBGXQY.id', result.result[0].main)
        this.props.params.isUpdate = true
      }
      Toast.success('保存成功', 0.5)
    } else {
      Toast.fail('保存失败', 0.5)      
    }
  }


  render () {
    
    return (
      <List renderHeader={() => '编辑报告'}>
        <List.Item
          extra={<Button type="primary" size="small" onClick={this.save.bind(this)} inline>保存</Button>}>
        </List.Item>
        <InputItem
          value={this.state.displayRecord.reporter}
          editable={false}
        >报告人
        </InputItem>
        <DatePicker
          mode="date"
          value={this.state.displayRecord.reportDate}
          disabled={this.props.params.isUpdate}
          maxDate={moment()}
        >
          <List.Item>报告日期</List.Item>
        </DatePicker>
        <DatePicker
          mode="datetime"
          value={moment()}
          disabled={true}
          maxDate={moment()}
        >
          <List.Item>报告时间</List.Item>
        </DatePicker>
        <List.Item>
          今日总结
          <TextareaItem
            value={this.state.displayRecord.content}
            onChange={this.inputContent.bind(this)}
            rows={7}
          >
          </TextareaItem>
        </List.Item>
      </List>
    )
  }
}

Detail.onRouteBack = function () {
  Toast.loading('读取中')
}

Detail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  userUid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
export default connect(({ auth: { user, userUid, token } }) => {
  return {
    user,
    userUid,
    token
  }
})(Detail)
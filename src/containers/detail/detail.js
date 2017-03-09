import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, DatePicker, TextareaItem, Button, Toast, WhiteSpace } from 'antd-mobile'
import moment from 'moment'
import _ from 'lodash'
import { getReportListAction } from '../../actions/reports/reports'

import { post } from '../../services/request'
class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reporter: this.props.user.value,
      reportDate: moment(),
      content: ''
    }
  }
  
  async componentDidMount () {
    if (this.props.isUpdate) {
      const newState = {
        reporter: _.get(this.props.record, ['BH_GZBGXQY.BH_GZBGXQYBGR', 'value']),
        reportDate: moment(parseInt(_.get(this.props.record, ['BH_GZBGXQY.BH_GZBGXQYBGRQ']))),
        content: _.get(this.props.record, ['BH_GZBGXQY.BH_GZBGXQYJRZJ'])
      }
      this.setState({
        ...newState
      })
    }
  }

  inputContent(content) {
    this.setState({
      ...this.state,
      content
    })
  }

  async save () {
    const record = this.props.record
    const now = moment().toDate().getTime()  + ''
    const boFields = {
      BH_GZBGXQYBGRQ: this.state.reportDate.toDate().getTime() + '', 
      BH_GZBGXQYTJSJ: now, 
      BH_GZBGXQYJRZJ: this.state.content, 
      BH_GZBGXQYMRJH: "", 
      BH_GZBGXQYBGR: this.props.user, 
      BH_GZBGXQYXGR: this.props.user
    }
    if (this.props.isUpdate) boFields.id = record['BH_GZBGXQY.id']
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
      if (!this.props.isUpdate) {
        _.set(record, 'BH_GZBGXQY.id', result.result[0].main)
        this.props.isUpdate = true
      }
      this.props.dispatch(getReportListAction(this.props.token, this.props.userUid))
      Toast.success('保存成功', 0.5)
    } else {
      Toast.fail('保存失败', 0.5)      
    }
  }


  render () {
    
    return (
      <List renderHeader={() => '编辑报告'}>
        <WhiteSpace />
        <List.Item
          extra={<Button type="primary" size="small" onClick={this.save.bind(this)} inline>保存</Button>}>
        </List.Item>
        <InputItem
          value={this.state.reporter}
          editable={false}
        >报告人
        </InputItem>
        <DatePicker
          mode="date"
          value={this.state.reportDate}
          disabled={this.props.isUpdate}
          maxDate={moment()}
          onChange={reportDate => this.setState({...this.state, reportDate})}
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
            value={this.state.content}
            onChange={this.inputContent.bind(this)}
            rows={7}
          >
          </TextareaItem>
        </List.Item>
      </List>
    )
  }
}

Detail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  userUid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  isUpdate: PropTypes.bool.isRequired
}
export default connect(({ auth: { user, userUid, token } }) => {
  return {
    user,
    userUid,
    token
  }
})(Detail)
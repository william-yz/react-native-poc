import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput } from 'react-native'


import { List, InputItem, Button, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'


class LoginPanel extends Component {
  constructor (props) {
    super(props)
    this.form = this.props.form
  }

  componentDidMount () {
    // this.form.setFieldsValue({
    //   userName: '13318960067',
    //   password: '548062'
    // })
  }
  validate () {
    this.form.validateFields(error => {
      if (!error) {
        this.props.loginHandler(this.form.getFieldsValue())
      }
    })
  }

  render () {
    const { getFieldProps, getFieldError } = this.props.form
    
    return (
      <View>
        <List renderHeader={() => '登录'}>
          <InputItem
            {...getFieldProps('userName',
              {rules: [{required: true}]})}
            clear
            type="number"
            error={!!getFieldError('userName')}   
          >用户名</InputItem>
          <InputItem
            {...getFieldProps('password',
              {rules: [{required: true}]})}
            clear
            error={!!getFieldError('password')}
            type="password"
          >密码</InputItem>

        </List>
          <WhiteSpace size="md"/>
          <Button
            onClick={this.validate.bind(this)}
            type="primary"
            >
            登录
          </Button>
      </View>
    )
  }
}

LoginPanel.propTypes = {
  form: PropTypes.object.isRequired,
  loginHandler: PropTypes.func.isRequired
}
export default createForm()(LoginPanel)
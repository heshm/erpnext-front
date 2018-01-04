import React,{PureComponent} from 'react';
import { Card, Form, Input, Button, Transfer, message } from 'antd';
import { list, user_role,update } from '../services/Role';

const FormItem = Form.Item;
class UserRole extends PureComponent{
  state = {
    mockData: [],
    targetKeys: [],
    loading: false
  }
  fetch = (userId) => {
    this.setState({loading: true})
    user_role(userId).then(({data}) => {
      this.setState({
        targetKeys: data.roleList,
        loading: false
      })
    })
  }
  renderItem = (item) => {
    return {
      label: item.roleName,
      value: item.roleId
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      this.fetch(values.userId)
    })
  }
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  }
  changRole = () => {
    const userId = this.props.form.getFieldValue('userId');
    const userRole = {
      userId: userId,
      roleList: this.state.targetKeys
    }
    update(userRole).then(({success}) => {
      if(success){
        message.success('用户角色更新成功!')
        this.fetch(userId)
      }
    })
  }
  componentDidMount() {
    list().then(({data}) => {
      this.setState({mockData: data})
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline" style={{display: 'flex',justifyContent: 'center'}}
                onSubmit={this.handleSubmit}
          >
            <FormItem label="用户">
              {getFieldDecorator('userId',{initialValue: ''})(
                <Input />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
            </FormItem>
          </Form>
        </Card>
        <Card style={{display: 'flex',justifyContent: 'center'}}
              loading={this.state.loading}
        >
          <Transfer
            rowKey={record => record.roleId}
            dataSource={this.state.mockData}
            titles={['系统已有权限', '当前用户权限']}
            render={this.renderItem}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
          />
          <Button type="primary" style={{marginTop: '25px'}} onClick={this.changRole}>提交</Button>
        </Card>
      </div>
    )
  }
}

export default Form.create()(UserRole);

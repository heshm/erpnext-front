import React,{PureComponent} from 'react';
import { Card, Form, Input, Button, Transfer, message } from 'antd';
import UserSelect from '../components/UserSelect';
import { list, user_role,update } from '../services/Role';

const FormItem = Form.Item;
const Search = Input.Search;
class UserRole extends PureComponent{
  state = {
    mockData: [],
    targetKeys: [],
    loading: false,
    userModal: false
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
	showUserSelectModal = () => {
		this.setState({userModal: true})
	}
	hideUserSelectModal = () => {
		this.setState({userModal: false})
	}
	okUserSelectModal = (record) => {
		this.props.form.setFieldsValue({
			userId: record.userId,
			userName: record.userName
		})
		this.hideUserSelectModal();
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
              {getFieldDecorator('userName',{initialValue: ''})(
								<Search onSearch={this.showUserSelectModal} enterButton readOnly/>
              )}
            </FormItem>
						{getFieldDecorator('userId',{initialValue: ''})(
							<Input type="hidden"/>
						)}
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
            titles={['系统已有角色', '当前用户角色']}
            render={this.renderItem}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
          />
          <Button type="primary" style={{marginTop: '25px'}} onClick={this.changRole}>提交</Button>
        </Card>
				<UserSelect visible={this.state.userModal}
										onCancle={this.hideUserSelectModal}
										selectOk={this.okUserSelectModal}
				/>
      </div>
    )
  }
}

export default Form.create()(UserRole);

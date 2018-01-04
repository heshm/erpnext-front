import React,{ PureComponent } from 'react';
import { Button, Table, Modal, Form, Input, Select, Popconfirm  } from 'antd';

import { list, create, remove } from '../services/Role';

const FormItem = Form.Item;
const getSelectOption = (appList) => {
  return appList.map(item => {
    return (
      <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
    )
  })
}
class RoleList extends PureComponent{
  state = {
    data: [],
    loading: false,
    visible: false
  }
  fetch = () => {
    this.setState({loading: true})
    list().then(({data}) => {
      this.setState({
        loading: false,
        data
      })
    })
  }
  getRoleTypeName = (roleType) => {
    return this.props.appList.map(item => {
      if(item.id === roleType){
	      return item.name;
      }else {
      	return '';
      }
    })

  }
  showModal = () => {
    this.setState({visible: true})
  }
  hideModal = () => {
    this.setState({visible: false})
  }
  submit = () => {
    const { validateFields } = this.props.form;
    validateFields((errors, values) => {
      if (!errors) {
        this.setState({loading: true})
        create(values).then(({success,data}) => {
          if(success){
            this.setState({visible: false})
            this.fetch();
            this.props.form.setFieldsValue({
              roleId: '',
              roleName: '',
              roleType: '',
              roleDesc: ''
            })
          }
        })
      }
    })
  }
  delete = (id) => {
    remove(id).then(({success}) => {
      if(success){
        this.fetch();
      }
    })
  }
  componentDidMount() {
    this.fetch();
  }
  render(){
    const columns = [
      {
        title: 'ID',
        dataIndex: 'roleId',
        key: 'roleId'
      }, {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName'
      }, {
        title: '角色归属',
        key: 'roleType',
        render: (text, record) => (
          <span>
            {this.getRoleTypeName(record.roleType)}
          </span>
        )
      }, {
        title: '描述',
        dataIndex: 'roleDesc',
        key: 'roleDesc'
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm placement="bottom"
                        title={`你确定删除该条记录`}
                        onConfirm={() => this.delete(record.roleId)}
                        okText="确定"
                        cancelText="取消">
              <a className="color-danger">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <div className="table-title">
          <span>角色列表</span>
          <span className="table-title-operations">
            <Button type="primary" onClick={this.showModal}>新增</Button>
          </span>
        </div>
        <Table columns={columns}
               loading={this.state.loading}
               dataSource={this.state.data}
               rowKey="roleId"
        />
        <Modal title="新增角色"
               visible={this.state.visible}
               onCancel={this.hideModal}
               onOk={this.submit}
        >
          <Form>
            <FormItem label="角色ID">
              {getFieldDecorator('roleId', {
                rules: [
                  { required: true, message: '请输入合法的ID!' }
                ]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="角色名称">
              {getFieldDecorator('roleName', {
                rules: [
                  { required: true, message: '请输入角色名称!' }
                ]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="角色类别">
              {getFieldDecorator('roleType', {
                rules: [
                  { required: true, message: '请输入角色名称!' }
                ]
              })(
                <Select>
                  {getSelectOption(this.props.appList)}
                </Select>
              )}
            </FormItem>
            <FormItem label="角色描述">
              {getFieldDecorator('roleDesc')(
                <Input.TextArea />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(RoleList);

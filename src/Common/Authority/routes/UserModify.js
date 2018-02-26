import React,{PureComponent} from 'react';
import {Form,Input,TreeSelect,Select,Radio,Button,message} from 'antd';
import {tree} from '../../Setup/services/Department';
import {list} from '../services/Role';
import { create, update } from '../services/User';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 8},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 8},
	},
}
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 14,
			offset: 8,
		},
	},
};
const getDeptTreeData = (tree) => {
	return tree.map(item => {
		if(item.children){
			return {
				label: item.name,
				key: item.id,
				value: item.id,
				children: getDeptTreeData(item.children)
			}
		} else {
			return {
				label: item.name,
				key: item.id,
				value: item.id
			}
		}
	})
}
const getRoleSelectItem = (roleList) => {
	return roleList.map(item => {
		return <Select.Option key={item.roleId} value={item.roleName}>{item.roleName}</Select.Option>
	})
}
class UserModify extends PureComponent{
	state = {
		deptTreeData: [],
		roleList: []
	}
	init = () => {
		tree().then(({data}) => {
			this.setState({deptTreeData: data.children})
		})
		list().then(({data}) => {
			this.setState({roleList: data})
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if(!errors){
				if(this.props.mode === 'modify'){
					update(values).then(({success}) => {
						if (success) {
							message.success('用户信息修改成功!')
						}
					})
				}else {
					create(values).then(({success}) => {
						if(success){
							message.success('用户信息新增成功!')
						}
					})
				}
			}
		})
	}
	componentDidMount(){
		this.init();
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormItem label="用户姓名" {...formItemLayout}>
						{getFieldDecorator('userName', {
							rules: [
								{ required: true, message: '请输入用户名称!' },
							]
						})(
							<Input/>
						)}
					</FormItem>
					<FormItem label="登录名" {...formItemLayout}>
						{getFieldDecorator('loginName', {
							rules: [
								{ required: true, message: '请输入名称!' },
							]
						})(
							<Input/>
						)}
					</FormItem>
					<FormItem label="归属机构" {...formItemLayout}>
						{getFieldDecorator('departmentIds', {
							rules: [
								{ required: true, message: '请选择归属机构!' },
							]
						})(
							<TreeSelect
								style={{ width: 250 }}
								treeData={getDeptTreeData(this.state.deptTreeData)}
								dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
								placeholder="请选择归属机构"
								multiple
								filterTreeNode={true}
							/>
						)}
					</FormItem>
					<FormItem label="主要角色" {...formItemLayout}>
						{getFieldDecorator('roleName', {
							rules: [
								{ required: true, message: '请输入名称!' },
							]
						})(
							<Select style={{width: '200px'}}>
								{getRoleSelectItem(this.state.roleList)}
							</Select>
						)}
					</FormItem>
					<FormItem label="联系电话" {...formItemLayout}>
						{getFieldDecorator('phoneNumber')(
							<Input/>
						)}
					</FormItem>
					<FormItem label="邮箱" {...formItemLayout}>
						{getFieldDecorator('email', {
							rules: [
								{ type: 'email', message: '请输入合法的邮箱地址!'},
							]
						})(
							<Input/>
						)}
					</FormItem>
					<FormItem label="是否有效" {...formItemLayout}>
						{getFieldDecorator('activeStatusFlag', {
							rules: [
								{ required: true, message: '是否有效标志必须选择!' },
							]
						})(
							<RadioGroup>
								<Radio value={1}>有效</Radio>
								<Radio value={0}>无效</Radio>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem {...tailFormItemLayout}>
						<Button type="primary"
										htmlType="submit"
						>提交</Button>
					</FormItem>
				</Form>
			</div>
		)
	}

}

export default Form.create({
	mapPropsToFields(props) {
		return {
			userName: Form.createFormField({
				value: props.user.userName
			}),
			loginName: Form.createFormField({
				value: props.user.loginName
			}),
			roleName: Form.createFormField({
				value: props.user.roleName
			}),
			departmentIds: Form.createFormField({
				value: props.user.departmentIds
			}),
			phoneNumber: Form.createFormField({
				value: props.user.phoneNumber
			}),
			email: Form.createFormField({
				value: props.user.email
			}),
			activeStatusFlag: Form.createFormField({
				value: props.user.activeStatusFlag
			})
		}
	}
})(UserModify);
import React,{PureComponent} from 'react';
import {Modal,Form,Input,Select,Radio} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 6},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 12},
	},
}
const getSelectOption = (permList) => {
	return permList.map(item => {
		return <Select.Option key={item.permissionId} value={item.permissionId}>{item.permissionName}</Select.Option>
	})
}
class PermissionForm extends PureComponent{
	state = {
		formItemVisible: false
	}
	onChange = (e) => {
		if(e.target.value){
			this.setState({formItemVisible: false})
		}else{
			this.setState({formItemVisible: true})
		}
	}
	onOk = () => {
		this.props.form.validateFields((errors, values) => {
			if (!errors){
				this.props.createPerm(values)
			}
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return (
			<Modal title="新增权限"
						 visible={this.props.visible}
						 onCancel={this.props.hideForm}
						 onOk={this.onOk}
			>
				<Form layout="horizontal">
					<FormItem label="权限ID" {...formItemLayout}>
						{getFieldDecorator('permissionId', {
							rules: [
								{ required: true, message: '请输入合法的ID!' },
								{ len: 7, message: '权限ID必须为7位' }
							]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem label="权限类别" {...formItemLayout}>
						{getFieldDecorator('permissionType',{
							rules: [
								{ required: true, message: '请选择权限类别' }
							]
						})(
							<Select>
								<Select.Option value="All">All</Select.Option>
								<Select.Option value="READ">READ</Select.Option>
								<Select.Option value="EXPORT">EXPORT</Select.Option>
								<Select.Option value="IMPORT">IMPORT</Select.Option>
								<Select.Option value="OTHER">OTHER</Select.Option>
							</Select>
						)}
					</FormItem>
					<FormItem label="权限名称" {...formItemLayout}>
						{getFieldDecorator('permissionName', {
							rules: [
								{ required: true, message: '请输入权限名称!' }
							]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem label="权限描述" {...formItemLayout}>
						{getFieldDecorator('permissionDesc', {
							rules: [
								{ required: true, message: '请输入权限描述!' }
							]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem label="是否组节点" {...formItemLayout}>
						{getFieldDecorator('isFriendly', {
							rules: [
								{ required: true, message: '必须选择!' }
							],
							initialValue: true
						})(
							<Radio.Group onChange={this.onChange}>
								<Radio value={true}>是</Radio>
								<Radio value={false}>否</Radio>
							</Radio.Group>
						)}
					</FormItem>
					{
						this.state.formItemVisible ? (
							<FormItem label="上级权限" {...formItemLayout}>
								{getFieldDecorator('parentPermissionId', {
									rules: [
										{ required: true, message: '必须选择!' }
									]
								})(
									<Select>
										{getSelectOption(this.props.permList)}
									</Select>
								)}
							</FormItem>
						) : ''
					}
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(PermissionForm);
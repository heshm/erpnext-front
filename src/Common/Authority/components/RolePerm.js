import React,{PureComponent} from 'react';
import { Card, Form, Select, Button, Transfer} from 'antd';
import {list as listRole} from '../services/Role';
import { list as listPerm,role_perm,update_role_perm } from '../services/Permisson';

const FormItem = Form.Item;
const getRoleSelectItem = (roleList) => {
	return roleList.map(item => {
		return <Select.Option key={item.roleId} value={item.roleId}>{item.roleName}</Select.Option>
	})
}
const getMockData = (permList) => {
	return permList.map(item => {
		return {
			permissionId: item.permissionId,
			permissionName: item.permissionName,
			disabled: item.isFriendly
		}
	})
}
class RolePerm extends PureComponent{
	state = {
		loading: false,
		roleList: [],
		permList: [],
		targetKeys: [],
		roleId: ''
	}
	init = () => {
		this.setState({loading:true})
		listRole().then(({data}) => {
			this.setState({
				roleList: data
			})
		})
		listPerm().then(({data}) => {
			this.setState({
				loading: false,
				permList: data
			})
		})
	}
	renderItem = (item) => {
		return {
			label: item.permissionName,
			value: item.permissionId
		}
	}
	fetch = (roleId) => {
		this.setState({loading:true})
		role_perm(roleId).then(({data}) => {
			this.setState({
				loading:false,
				roleId,
				targetKeys:data.permissionSet
			})
		})
	}
	handleChange = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeys: nextTargetKeys });
	}
	handleQuery = () => {
		this.fetch(this.props.form.getFieldValue('roleId'))
	}
	updatePerm = () => {
		const rolePerm = {
			roleId: this.state.roleId,
			permissionSet: this.state.targetKeys
		}
		this.setState({loading:true})
		update_role_perm(rolePerm).then(({data}) => {
			this.setState({
				loading: false,
				targetKeys: data.permissionSet
			})
		})
	}
	componentDidMount(){
		this.init();
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Card bordered={false}>
					<Form layout="inline"
								style={{display: 'flex',justifyContent: 'center'}}
					>
						<FormItem label="角色">
							{getFieldDecorator('roleId',{initialValue: `${this.state.roleId}`})(
								<Select style={{width: '200px'}}>
									{getRoleSelectItem(this.state.roleList)}
								</Select>
							)}
						</FormItem>
						<FormItem>
							<Button type="primary"
											htmlType="button"
											onClick={this.handleQuery}
											loading={this.state.loading}
							>查询</Button>
						</FormItem>
					</Form>
				</Card>
				<Card style={{display: 'flex',justifyContent: 'center'}}
							loading={this.state.loading}
				>
					<Transfer
						rowKey={record => record.permissionId}
						dataSource={getMockData(this.state.permList)}
						titles={['系统已有权限', '当前角色权限']}
						render={this.renderItem}
						targetKeys={this.state.targetKeys}
						onChange={this.handleChange}
						listStyle={{
							width: 250,
							height: 300,
						}}
					/>
					<Button type="primary"
									style={{marginTop: '25px'}}
									onClick={this.updatePerm}
					>提交</Button>
				</Card>
			</div>
		)
	}
}

export default Form.create()(RolePerm);
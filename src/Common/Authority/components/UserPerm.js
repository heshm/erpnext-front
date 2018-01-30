import React,{PureComponent} from 'react';
import {Transfer,Form,Button,Input,Card,message} from 'antd';
import UserSelect from './UserSelect';
import { list as listPerm,user_perm,update_user_perm} from '../services/Permisson';

const FormItem = Form.Item;
const getMockData = (permList) => {
	return permList.map(item => {
		return {
			permissionId: item.permissionId,
			permissionName: item.permissionName,
			disabled: item.isFriendly
		}
	})
}
const Search = Input.Search;
class UserPerm extends PureComponent{
	state = {
		loading: false,
		targetKeys: [],
		permList: [],
		modal: false
	}
	init = () => {
		this.setState({loading:true})
		listPerm().then(({data}) => {
			this.setState({
				loading: false,
				permList: data
			})
		})
	}
	fetch = (userId) => {
		this.setState({loading:true})
		user_perm(userId).then(({data}) => {
			this.setState({
				loading:false,
				targetKeys:data.permissionList
			})
		})
	}
	renderItem = (item) => {
		return {
			label: item.permissionName,
			value: item.permissionId
		}
	}
	handleChange = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeys: nextTargetKeys });
	}
	handleQuery = () => {
		this.fetch(this.props.form.getFieldValue('userId'))
	}
	updatePerm = () => {
		const userId = this.props.form.getFieldValue('userId');
		const userPerm = {
			userId,
			permissionList: this.state.targetKeys
		}
		update_user_perm(userPerm).then(({success}) => {
			if(success){
				message.success("用户权限更新成功!")
				this.fetch(userId);
			}
		})
	}
	showUserSelectModal = () => {
		this.setState({modal: true})
	}
	hideUserSelectModal = () => {
		this.setState({modal: false})
	}
	okUserSelectModal = (record) => {
		this.props.form.setFieldsValue({
			userId: record.userId,
			userName: record.userName
		})
		this.hideUserSelectModal();
	}
	componentDidMount() {
		this.init()
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return(
			<div>
				<Card bordered={false}>
					<Form layout="inline"
								style={{display: 'flex',justifyContent: 'center'}}
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
						titles={['系统已有权限', '当前用户权限']}
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
				<UserSelect visible={this.state.modal}
										onCancle={this.hideUserSelectModal}
										selectOk={this.okUserSelectModal}
				/>
			</div>
		)
	}
}

export default Form.create()(UserPerm);
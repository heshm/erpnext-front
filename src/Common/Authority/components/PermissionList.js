import React,{PureComponent} from 'react';
import { Button, Table } from 'antd';
import PermissionForm from './PermissionForm';
import {list} from '../services/Permisson';

const getParentPerm = (permList) => {
	return permList.map(item => {
		return {
			permissionId: item.permissionId,
			permissionName: item.permissionName
		}
	})
}

class PermissionList extends PureComponent {
	state = {
		loading: false,
		permList: [],
		permForm: false
	}
	fetch = () => {
		this.setState({loading: true})
		list().then(({data}) => {
			this.setState({
				loading: false,
				permList: data
			})
		})
	}
	showForm = () => {
		this.setState({permForm: true})
	}
	hideForm = () => {
		this.setState({permForm: false})
	}
	componentDidMount(){
		this.fetch();
	}
	render() {
		const columns = [
			{
				title: '权限ID',
				dataIndex: 'permissionId',
				key: 'permissionId',
				width: '25%'
			}, {
				title: '权限类型',
				dataIndex: 'permissionType',
				key: 'permissionType',
				width: '20%'
			}, {
				title: '权限名称',
				dataIndex: 'permissionName',
				key: 'permissionName',
				width: '20%'
			}, {
				title: '权限描述',
				dataIndex: 'permissionDesc',
				key: 'permissionDesc'
			}
		];
		return (
			<div>
				<div className="table-title">
					<span>权限列表</span>
					<span className="table-title-operations">
            <Button type="primary" onClick={this.showForm}>新增</Button>
          </span>
				</div>
				<Table columns={columns}
							 loading={this.state.loading}
							 dataSource={this.state.permList}
							 rowKey="permissionId"
							 size="middle"
							 pagination={false}
				/>
				<PermissionForm visible={this.state.permForm}
												hideForm={this.hideForm}
												permList={getParentPerm(this.state.permList)}
				/>
			</div>
		)
	}
}

export default PermissionList;
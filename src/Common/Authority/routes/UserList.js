import React, {PureComponent} from 'react';
import {Form, Button, Card, Input, Table} from 'antd';

import {list} from '../services/User';

const FormItem = Form.Item;

class UserList extends PureComponent {
	state = {
		loading: false,
		pagination: {
			size: 'default',
			pageSize: this.props.modal ? 5 : 10
		},
		data: [],
		params: {},
		selectedRow: {}
	}
	fetch = (pagination) => {
		this.setState({loading: true});
		const params = {...this.state.params}
		list(pagination, params).then(({success, data}) => {
			const pagination = {...this.state.pagination};
			pagination.total = data.totalElements;
			pagination.pageSize = data.size;
			this.setState({
				loading: false,
				data: data.content,
				pagination
			})
		})
	}
	handleTableChange = (pagination, filters, sorter) => {
		this.fetch(pagination);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			this.setState({params: values}, () => {
				this.fetch()
			})
		})
	}

	componentDidMount() {
		this.fetch(this.state.pagination);
	}

	render() {
		const columns = [
			{
				title: '姓名',
				dataIndex: 'userName',
				key: 'userName'
			}, {
				title: '用户名',
				dataIndex: 'loginName',
				key: 'loginName'
			}, {
				title: '联系电话',
				dataIndex: 'phoneNumber',
				key: 'phoneNumber'
			}, {
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			}, {
				title: '主要角色',
				dataIndex: 'roleName',
				key: 'roleName'
			}, {
				title: '详细',
				key: 'detail',
				render: (text, record) => (
					<span>
            <a disabled={this.props.modal} onClick={() => {
				this.props.showDetail(record.userId)
			}}>详细</a>
          </span>
				)
			}
		];
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Card bordered={false}>
					<Form layout="inline" style={{textAlign: 'center'}}
						  onSubmit={this.handleSubmit}
					>
						<FormItem label="归属机构">
							{getFieldDecorator('departmentId', {initialValue: ''})(
								<Input/>
							)}
						</FormItem>
						<FormItem label="姓名">
							{getFieldDecorator('userName', {initialValue: ''})(
								<Input/>
							)}
						</FormItem>
						<FormItem label="登录名">
							{getFieldDecorator('loginName', {initialValue: ''})(
								<Input/>
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" icon="search">查询</Button>
						</FormItem>
						{this.props.modal ? '' :
							<FormItem>
								<Button icon="upload">导入</Button>
							</FormItem>
						}
					</Form>
				</Card>
				<Table columns={columns}
					   size="middle"
					   loading={this.state.loading}
					   dataSource={this.state.data}
					   pagination={this.state.pagination}
					   onChange={this.handleTableChange}
					   rowKey="userId"
					   onRow={(record) => ({
						   onClick: () => {
							   if (this.props.modal) {
								   this.setState({selectedRow: record});
								   this.props.onSelect(record);
							   }
						   }
					   })}
					   rowClassName={(record) => {
						   if (record.userId === this.state.selectedRow.userId) {
							   return 'table-row-selected'
						   }
						   return ''
					   }}
				/>
			</div>
		)
	}
}

export default Form.create()(UserList);

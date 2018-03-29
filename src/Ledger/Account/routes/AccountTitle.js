import React, {PureComponent} from 'react';
import {Table, Form, Input, Card, Button} from 'antd';
import {request, jsonToUrlParams} from '../../../utils';

const FormItem = Form.Item;

const accountCharacter = {
	0: '\u8D44\u4EA7',
	1: '\u8D1F\u503A',
	2: '\u5171\u540C',
	3: '\u6240\u6709\u8005\u6743\u76CA',
	4: '\u635F\u76CA',
	5: '\u8868\u5916\u79D1\u76EE'
}

const amountDirection = {
	0: '\u501F\u65B9',
	1: '\u8D37\u65B9',
	2: '\u501F\u65B9\u6216\u8D37\u65B9',
	3: '\u6536\u65B9',
	4: '\u4ED8\u65B9',
	5: '\u6536\u65B9\u6216\u4ED8\u65B9'
}

const balanceDirection = {
	0: '\u501F\u65B9',
	1: '\u8D37\u65B9',
	2: '\u501F\u65B9\u548C\u8D37\u65B9',
	3: '\u6536\u65B9'
}

const columns = [
	{
		title: '科目编号',
		dataIndex: 'accountNo',
		key: 'accountNo',
	}, {
		title: '科目名称',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '科目性质',
		key: 'accountCharacter',
		render: (text, record) => (
			<span>{`${accountCharacter[record.accountCharacter]}`}</span>
		)
	}, {
		title: '发生额方向',
		key: 'amountDirection',
		render: (text, record) => (
			<span>{`${amountDirection[record.amountDirection]}`}</span>
		)
	}, {
		title: '余额方向',
		key: 'balanceDirection',
		render: (text, record) => (
			<span>{`${balanceDirection[record.balanceDirection]}`}</span>
		)
	}
];

const listUrl = '/api/ledger/account/accountTitle/listPage?';

class AccountTitle extends PureComponent {
	state = {
		data: [],
		pagination: {
			size: 'default'
		},
		loading: false,
		uri: listUrl
	}

	componentDidMount() {
		this.fetch();
	}

	fetch = (params = {}) => {
		const urlParams = jsonToUrlParams(params);
		const uri = this.state.uri + urlParams;
		this.setState({loading: true});
		request(uri, {
			method: 'get',
			data: params
		}).then((response) => {
			const {success, data} = response;
			if (success) {
				const pagination = {...this.state.pagination};
				pagination.total = data.totalElements;
				this.setState({
					loading: false,
					data: data.content,
					pagination
				});
			}
		})
	}
	handleTableChange = (pagination, filters, sorter) => {
		console.log(pagination)
		const pager = {...this.state.pagination};
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			size: pagination.pageSize,
			page: pagination.current - 1,
			...filters,
		});
	}
	handleQuery = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if (!errors) {
				const pager = {...this.state.pagination};
				pager.current = 1;
				this.setState({
					uri: listUrl + jsonToUrlParams(values) + '&',
					pagination: pager,
				}, () => {
					this.fetch()
				})
			}
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Card
					bordered={false}
				>
					<Form
						layout="inline"
						style={{textAlign: 'center'}}
						onSubmit={this.handleQuery}
					>
						<FormItem
							label="科目编号"
						>
							{getFieldDecorator('accountNo', {
								initialValue: ''
							})(
								<Input/>
							)}
						</FormItem>
						<FormItem
							label="科目名称"
						>
							{getFieldDecorator('name', {
								initialValue: ''
							})(
								<Input/>
							)}
						</FormItem>
						<FormItem>
							<Button
								type="primary"
								htmlType="submit"
								loading={this.state.loading}
							>查询</Button>
						</FormItem>
					</Form>
				</Card>
				<Table
					columns={columns}
					rowKey={record => record.accountNo}
					dataSource={this.state.data}
					pagination={this.state.pagination}
					loading={this.state.loading}
					onChange={this.handleTableChange}
					size="middle"
				/>
			</div>
		)
	}
}

export default Form.create()(AccountTitle);

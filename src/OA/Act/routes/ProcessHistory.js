import React,{PureComponent} from 'react';
import {Form,Button,DatePicker,Card,Table} from 'antd';
import {pageListHis} from '../services/ProcessInst';
import {getDate} from '../../../utils';

const FormItem = Form.Item;
class ProcessHistory extends PureComponent{
	state = {
		loading: false,
		data: [],
		pagination: {
			size: 'default'
		}
	}
	fetch = (pagination,filter = {}) => {
		this.setState({loading: true});
		pageListHis(pagination,filter).then(({data}) => {
			this.setState({
				loading: false,
				data: data.content
			})
		})
	}
	handleTableChange = (pagination, filters, sorter) => {
		console.log(pagination)
	}
	componentDidMount() {
		this.fetch(this.state.pagination);
	}
	render() {
		const {getFieldDecorator} = this.props.form;
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			}, {
				title: '名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '开始时间',
				key: 'startTime',
				render: (text,record) => (
					<span>{getDate(record.startTime)}</span>
				)
			}, {
				title: '结束时间',
				key: 'endTime',
				render: (text,record) => (
					<span>{getDate(record.endTime)}</span>
				)
			}
		];
		return (
			<div>
				<Card>
					<Form
						layout="inline"
						style={{textAlign: 'center'}}
						onSubmit={this.handleQuery}
					>
						<FormItem label="开始时间">
							{getFieldDecorator('accountNo')(
								<DatePicker/>
							)}
						</FormItem>
						<FormItem label="结束时间">
							{getFieldDecorator('name')(
								<DatePicker/>
							)}
						</FormItem>
						<FormItem>
							<Button
								type="primary"
								htmlType="submit"
							>查询</Button>
						</FormItem>
					</Form>
				</Card>
				<Table columns={columns}
					   loading={this.state.loading}
					   dataSource={this.state.data}
					   pagination={this.state.pagination}
					   onChange={this.handleTableChange}
					   rowKey="id"
					   size="middle"
				/>
			</div>
		)
	}
}

export default Form.create()(ProcessHistory);
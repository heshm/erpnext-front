import React,{PureComponent} from 'react';
import { Table } from 'antd';
import { list_doing } from '../services/Task';

class DoingTask extends PureComponent {
	state = {
		loading: false,
		data: []
	}
	fetch = () => {
		this.setState({ loading: true });
		list_doing().then(({data}) => {
			this.setState({
				loading: false,
				data
			});
		})
	}
	componentDidMount() {
		this.fetch();
	}

	render() {
		const columns = [
			{
				title: '任务ID',
				dataIndex: 'id',
				key: 'id'
			}, {
				title: '当前环节',
				key: 'name',
				dataIndex: 'name',
			}, {
				title: '流程实例ID',
				dataIndex: 'processInstanceId',
				key: 'processInstanceId'
			}, {
				title: '创建时间',
				dataIndex: 'createTime',
				key: 'createTime'
			}, {
				title: '办理人',
				dataIndex: 'assignee',
				key: 'assignee'
			}
		];
		return (
			<div>
				<Table columns={columns}
				       size="middle"
				       dataSource={this.state.data}
				       rowKey='id'
				       loading={this.state.loading}
				       pagination={false}
				/>
			</div>
		)
	}
}

export default DoingTask;
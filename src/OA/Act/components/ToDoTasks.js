import React,{PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { list_tasks } from '../services/Task';
import {server_path} from "../../../utils/Config";

class ToDoTasks extends PureComponent {
	state = {
		loading: false,
		data: []
	}
	fetch = () => {
		this.setState({ loading: true });
		list_tasks().then(({data}) => {
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
				title: '流程资源',
				key: 'source',
				render: (text,record) => (
					<a href={`${server_path}/static/flowable/index.html#/processes/diagram/${record.processInstanceId}/true`}
						 target="_blank">流转图</a>
				)
			}, {
				title: '操作',
				key: 'action',
				render: (text,record) => (
					<div>
						<Link to={`task/${record.id}`}>详细</Link>
					</div>
				)
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

export default ToDoTasks;
import React,{PureComponent} from 'react';
import {Table, Divider, Modal, message} from 'antd';

import {list,deleteProcessInst} from '../services/ProcessInst';
import {server_path} from '../../../utils/Config';

class ProcessInst extends PureComponent {
	state = {
		loading: false,
		data: []
	}
	fetch = () => {
		this.setState({ loading: true });
		list().then(({data}) => {
			this.setState({
				loading: false,
				data
			});
		})
	}
	cancelProcess = (processInstanceId) => {
		Modal.confirm({
			title: "取消流程",
			content: "你确定取消该流程?",
			onOk: () => {
				this.deleteProcess(processInstanceId);
			}
		})
	}
	deleteProcess = (id) => {
		deleteProcessInst(id).then(({success}) => {
			if(success) {
				message.success("流程取消成功!")
				this.fetch();
			}
		})
	}
	componentDidMount() {
		this.fetch();
	}
	render(){
		const columns = [
			{
				title: '流程ID',
				dataIndex: 'id',
				key: 'id'
			}, {
				title: '流程名称',
				key: 'processDefinitionName',
				dataIndex: 'processDefinitionName',
			}, {
				title: '版本',
				key: 'processDefinitionVersion',
				render: (text, record) => (
					<span>V:&nbsp;{record.processDefinitionVersion}</span>
				)
			}, {
				title: '创建时间',
				dataIndex: 'started',
				key: 'started'
			}, {
				title: '流程资源',
				key: 'source',
				render: (text,record) => (
					<a href={`${server_path}/static/flowable/index.html#/processes/diagram/${record.id}/true`}
					   target="_blank">流转图</a>
				)
			}, {
				title: '操作',
				key: 'action',
				render: (text,record) => (
					<div>
						<a>详细</a>
						<Divider type="vertical" />
						<a onClick={() => {this.cancelProcess(record.id)}}>取消</a>
					</div>
				)
			}
		];
		return (
			<Table columns={columns}
			       size="middle"
			       dataSource={this.state.data}
			       rowKey='id'
			       loading={this.state.loading}
			       pagination={false}
			/>
		)
	}
}

export default ProcessInst;
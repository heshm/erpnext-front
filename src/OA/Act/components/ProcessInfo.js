import React, { PureComponent } from 'react';
import {
	Card, Form, Table, message, Select
} from 'antd';
import { connect } from 'react-redux';
import { pageList, deleteProcess, hasStartForm } from '../services/Process';
import { server_path } from '../../../utils/Config';
import {getCategoryName} from '../../OAUtil';
import {newTaskWithoutForm} from '../services/Task';

const getSelectOption = (appList) => {
	return appList.map((item) => {
		return (
			<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
		)
	})
}
const FormItem = Form.Item;
class ProcessInfo extends PureComponent {
	state = {
		loading: false,
		data: [],
		pagination: {
			current: 1
		},
		category: ''
	}
	fetch = (category = '') => {
		this.setState({ loading: true });
		pageList(category, this.state.pagination.current - 1).then(({ data }) => {
			const pagination = { ...this.state.pagination };
			pagination.total = data.totalElements;
			pagination.current = data.number + 1;
			this.setState({
				loading: false,
				data: data.content,
				pagination
			});
		})
	}
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			loading: true,
			pagination: pager
		}, () => {
			this.fetch(this.state.category);
		})
	}
	deleteProcessDeploy = (id) => {
		deleteProcess(id).then(({ success }) => {
			if (success) {
				message.success("流程删除成功!")
				this.fetch(this.state.category)
			}
		})
	}
	selectChange = (value) => {
		this.setState({
			category: value
		})
		this.fetch(value);
	}
	startProcess = (record) => {
		const processDefId = record.processDefinition.id;
		hasStartForm(processDefId).then(({data}) => {
			if(data){
				this.props.history.push(`start-form/${processDefId}`)
			}else {
				this.startProcessWithoutForm(record);
			}
		})
	}
	startProcessWithoutForm = (record) => {
		const requestData = {
			name: record.processDefinition.name,
			processDefinitionId: record.processDefinition.id
		}
		newTaskWithoutForm(requestData).then(({success}) => {
			if(success){
				message.success('流程启动成功!')
			}
		})
	}
	componentDidMount() {
		this.fetch();
	}

	render() {
		const columns = [
			{
				title: 'ID',
				dataIndex: 'processDefinition.id',
				key: 'processDefinition.id'
			}, {
				title: '分类',
				key: 'name',
				render: (text, record) => (
					<span>{getCategoryName(record.processDefinition.category, this.props.app.appList)}</span>
				)
			}, {
				title: '标识',
				dataIndex: 'processDefinition.key',
				key: 'processDefinition.key'
			}, {
				title: '名称',
				dataIndex: 'processDefinition.name',
				key: 'processDefinition.name'
			}, {
				title: '版本',
				key: 'processDefinition.version',
				render: (text, record) => (
					<span>V:&nbsp;{record.processDefinition.version}</span>
				)
			}, {
				title: '部署时间',
				dataIndex: 'deployment.deploymentTime',
				key: 'deployment.deploymentTime'
			}, {
				title: '流程资源',
				key: 'resource',
				render: (text, record) => (
					<div>
						<a href={`${server_path}/static/flowable/index.html#/processes/diagram/${record.processDefinition.id}/false`} target="_blank">流程图</a>
					</div>
				)
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<div>
						<a onClick={() => {
							this.startProcess(record);
						}}>启动流程</a>
					</div>
				)
			}
		];
		return (
			<div>
				<Card bordered={false}>
					<Form layout="inline" style={{ textAlign: 'center' }}>
						<FormItem label="分类">
							<Select style={{ width: 250 }} onChange={this.selectChange}>
								<Select.Option value="">全部</Select.Option>
								{getSelectOption(this.props.app.appList)}
								<Select.Option value="other">其它</Select.Option>
							</Select>
						</FormItem>
					</Form>
				</Card>
				<Table columns={columns}
							 size="middle"
							 dataSource={this.state.data}
							 rowKey={record => record.processDefinition.id}
							 pagination={this.state.pagination}
							 onChange={this.handleTableChange}
				/>
			</div>
		)
	}
}

export default connect(({ app }) => ({ app }))(ProcessInfo);
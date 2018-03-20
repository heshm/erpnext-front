import React, { PureComponent } from 'react';
import {Card,Button,Table} from 'antd';
import {connect} from 'react-redux';
import DescriptionList from '../../../components/DescriptionList';
import {list_one,complete,list_his_tasks} from '../services/Task';
import {server_path} from "../../../utils/Config";

const { Description } = DescriptionList;
class TaskDetail extends PureComponent{
	state = {
		loading: false,
		task: {},
		hisTasks: []
	}
	fetch = (id) => {
		this.setState({ loading: true });
		list_one(id).then(({data}) => {
			this.setState({
				task: data
			},() => {
				list_his_tasks(this.state.task.processInstanceId).then(({data}) => {
					this.setState({
						loading: false,
						hisTasks: data
					})
				})
			})
		})
	}
	getExtra = () => {
		const {userInfo} = this.props.app;
		if(this.state.task.assignee === userInfo.userId){
			return(
				<Button onClick={this.completeTask}>完成</Button>
			)
		}else {
			return (
				<Button>签收</Button>
			)
		}
	}
	completeTask = () => {
		console.log(this.state.task.id)
		complete(this.state.task.id).then(({success}) => {
			if(success){
				console.log("success completed task")
			}
		})
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		this.fetch(id);
	}
	render() {
		const columns = [
			{
				title: '执行环节',
				key: 'name',
				dataIndex: 'name',
			},{
				title: '执行人',
				key: 'assignee',
				dataIndex: 'assignee',
			}, {
				title: '开始时间',
				key: 'createTime',
				dataIndex: 'createTime',
			}, {
				title: '结束时间',
				key: 'endDate',
				dataIndex: 'endDate',
			}, {
				title: '处理意见',
				key: 'comment',
				dataIndex: 'duration',
			}, {
				title: '任务历时',
				key: 'duration',
				dataIndex: 'duration',
			}
		];
		const {name,assignee,dueDate,processDefinitionName,processInstanceId} = this.state.task;
		return (
			<div>
				<Card bordered={true} title={name} extra={this.getExtra()}>
					<DescriptionList size="large" col={2}>
						<Description term="执行人">{assignee}</Description>
						<Description term="到期时间">{dueDate}</Description>
						<Description term="所属流程">
							<a href={`${server_path}/static/activiti/editor/index.html#/processes/diagram/${processInstanceId}/true`}
								 target="_blank">{processDefinitionName}</a>
						</Description>
						<Description>
							<Button type="primary" ghost size="small">显示表单</Button>
						</Description>
					</DescriptionList>
				</Card>
				<Table dataSource={this.state.hisTasks}
							 columns={columns}
							 size="middle"
							 rowKey="id"
							 loading={this.state.loading}/>
			</div>
		)
	}
}

export default connect(({ app }) => ({ app }))(TaskDetail);
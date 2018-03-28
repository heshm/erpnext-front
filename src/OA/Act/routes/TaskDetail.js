import React, { PureComponent } from 'react';
import {Card,Button,Table,Modal,message} from 'antd';
import {connect} from 'react-redux';
import DescriptionList from '../../../components/DescriptionList';
import RenderForm from '../components/RenderForm';
import {list_one,complete,list_his_tasks,getFormData,claim} from '../services/Task';
import {server_path} from "../../../utils/Config";
import {getDuration} from '../../../utils';

const { Description } = DescriptionList;
class TaskDetail extends PureComponent{
	state = {
		loading: false,
		task: {},
		hisTasks: [],
		showForm: false,
		formInfo: {}
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
			if(!this.state.task.taskHasForm){
				return(
					<Button onClick={this.completeTask}>完成</Button>
				)
			}else {
				return '';
			}

		}else {
			return (
				<Button onClick={this.claimTask}>签收</Button>
			)
		}
	}
	claimTask = () => {
		Modal.confirm({
			title: "签收任务",
			content: "你确定签收该任务?",
			onOk: () => {
				claim(this.state.task.id).then(({success}) => {
					if(success){
						const { id } = this.props.match.params;
						this.fetch(id);
					}
				})
			}
		})
	}
	completeTask = (values) => {
		if(this.state.task.taskHasForm){
			complete(this.state.task.id,values).then(({success}) => {
				if(success){
					message.success("任务处理完成!")
					this.props.history.push("../task")
				}
			})
		}else{
			complete(this.state.task.id).then(({success}) => {
				if(success){
					message.success("任务处理完成!")
					this.props.history.push("../task")
				}
			})
		}
	}
	showForm = () => {const {userInfo} = this.props.app;
		if(this.state.task.assignee === userInfo.userId){
			this.setState({showForm: !this.state.showForm})
			if(!this.state.formInfo.id) {
				getFormData(this.state.task.id).then(({data}) => {
					//this.setState({formInfo: data})
					this.setState({
						formInfo: data
					})
				})
			}
		}else{
			message.info("请先签收任务！")
		}
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
				render: (text,record) => (
					<span>{getDuration(record.duration)}</span>
				)
			}
		];
		const {name,assignee,dueDate,processDefinitionName,processInstanceId} = this.state.task;
		return (
			<div>
				<Card bordered={true} title={name} extra={this.getExtra()}>
					<DescriptionList size="large" col={2}>
						<Description term="执行人">{assignee}</Description>
						<Description term="到期时间">{dueDate ? dueDate : '无到期时间'}</Description>
						<Description term="所属流程">
							<a href={`${server_path}/static/flowable/index.html#/processes/diagram/${processInstanceId}/true`}
								 target="_blank">{processDefinitionName}</a>
						</Description>
						<Description>
							{this.state.task.formKey ?
								<Button type="primary" ghost size="small" onClick={this.showForm}>
									{this.state.showForm ? '显示详细' : '显示表单'}
								</Button> :
								'详细信息'
							}

						</Description>
					</DescriptionList>
				</Card>
				<Card bordered={false}>
					{this.state.showForm ?
						<RenderForm fields={this.state.formInfo.fields}
												formProperties={this.state.formInfo.formProperties}
												submit={this.completeTask}/>
						:
						<Table dataSource={this.state.hisTasks}
						       columns={columns}
						       size="middle"
						       rowKey="id"
						       loading={this.state.loading}/>
					}
				</Card>
			</div>
		)
	}
}

export default connect(({ app }) => ({ app }))(TaskDetail);
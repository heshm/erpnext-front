import React, { PureComponent } from 'react';
import { Form, Button, Card, Input, Table, message, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { list, create, deploy, updateCategory } from '../services/Model';
import { server_path } from '../../../utils/Config';
import ProcessCreateModal from '../components/ProcessCreateModal';
import CategorySetModal from '../components/CategorySetModal';

const FormItem = Form.Item;
const getName = (id, appList) => {
	let name = "暂无分类";
	for (let item of appList) {
		if (id === item.id) {
			name = item.name;
			break;
		}
	}
	return name;
}
class Model extends PureComponent {
	state = {
		loading: false,
		createModalVisible: false,
		category: {
			modeId: '',
			appId: ''
		},
		setCategoryModalVisible: false,
		data: []
	}
	fetch = (params) => {
		this.setState({
			loading: true,
			createModalVisible: false,
			setCategoryModalVisible: false
		});
		list(params).then(({ data }) => {
			this.setState({
				loading: false,
				data
			})
		})
	}
	showCreateModal = () => {
		this.setState({ createModalVisible: true })
	}
	hideCreateModal = () => {
		this.setState({ createModalVisible: false })
	}
	hideSetCategoryModal = () => {
		this.setState({ setCategoryModalVisible: false })
	}
	showSetCategoryModal = (appId, modelId) => {
		this.setState({
			category: {
				appId, modelId
			},
			setCategoryModalVisible: true
		})
	}
	deployModel = (modelId) => {
		deploy(modelId).then(({ success }) => {
			if (success) {
				message.success("模型部署成功!")
			}
		})
	}
	createModel = (model) => {
		create(model).then(({ success, data }) => {
			if (success) {
				this.fetch({})
			}
		})
	}
	changeCategory = () => {
		updateCategory(this.state.category.appId, this.state.category.modelId).then(({ success }) => {
			if (success) {
				this.fetch({});
			}
		})
	}
	updCategory = (appId) => {
		this.setState({
			category: {
				...this.state.category,
				appId
			}
		})
	}
	componentDidMount() {
		this.fetch({});
	}
	render() {
		const columns = [
			{
				title: 'ID',
				dataIndex: 'key',
				key: 'key'
			}, {
				title: '名称',
				dataIndex: 'name',
				key: 'name'
			}, {
				title: '分类',
				key: 'category',
				render: (text, record) => (
					<a onClick={() => {
						this.showSetCategoryModal(record.category, record.id)
					}}>{getName(record.category, this.props.app.appList)}</a>
				)
			}, {
				title: '版本',
				dataIndex: 'version',
				key: 'version'
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a href={`${server_path}/static/flowable/index.html#/editor/${record.id}`} target="_blank">编辑</a>
						<span className="ant-divider" />
						<Popconfirm title="你确认部署该模型?" onConfirm={() => {
							this.deployModel(record.id)
						}} okText="确认" cancelText="取消">
							<a>部署</a>
						</Popconfirm>

					</span>
				)
			}
		];
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Card bordered={false}>
					<Form layout="inline" style={{ textAlign: 'center' }}
						onSubmit={this.handleSubmit}
					>
						<FormItem label="所属系统">
							{getFieldDecorator('departmentId')(
								<Input />
							)}
						</FormItem>
						<FormItem label="名称">
							{getFieldDecorator('name')(
								<Input />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" icon="search">查询</Button>
						</FormItem>
					</Form>
				</Card>
				<div className="table-title">
					<span>模型列表</span>
					<span className="table-title-operations">
						<Button type="primary" size="small" onClick={this.showCreateModal}>新增</Button>
						<Button type="primary" size="small">导入</Button>
					</span>
				</div>
				<Table columns={columns}
					size="middle"
					dataSource={this.state.data}
					rowKey="key"
				>
				</Table>
				<ProcessCreateModal visible={this.state.createModalVisible}
					onCancel={this.hideCreateModal}
					createModel={this.createModel}
				/>
				<CategorySetModal visible={this.state.setCategoryModalVisible}
					onCancle={this.hideSetCategoryModal}
					appList={this.props.app.appList}
					category={this.state.category}
					selectChange={this.updCategory}
					onOk={this.changeCategory}
				/>
			</div>
		)
	}
}

export default connect(({ app }) => ({ app }))(Form.create()(Model));
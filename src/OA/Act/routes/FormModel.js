import React, {PureComponent} from 'react';
import {Button, Table} from 'antd';
import {list, create} from '../services/Model';
import {server_path} from '../../../utils/Config';
import FormCreateModal from '../components/FormCreateModal';

class FormModel extends PureComponent {
	state = {
		loading: false,
		modalVisible: false,
		data: []
	}
	fetch = (params) => {
		this.setState({
			loading: true,
			modalVisible: false
		});
		list(params).then(({data}) => {
			this.setState({
				loading: false,
				data
			})
		})
	}
	showModal = () => {
		this.setState({modalVisible: true})
	}
	hideModal = () => {
		this.setState({modalVisible: false})
	}
	createForm = (form) => {
		create(form).then(({success, data}) => {
			if (success) {
				this.fetch({modelType: 2})
			}
		})
	}

	componentDidMount() {
		this.fetch({
			modelType: 2
		});
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
				title: '版本',
				dataIndex: 'version',
				key: 'version'
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a href={`${server_path}/static/flowable/#/form-editor/${record.id}`} target="_blank">编辑</a>
					</span>
				)
			}
		];
		return (
			<div>
				<div className="table-title">
					<span>表单列表</span>
					<span className="table-title-operations">
            			<Button type="primary" size="small" onClick={this.showModal}>新增</Button>
          			</span>
				</div>
				<Table columns={columns}
							 size="middle"
							 dataSource={this.state.data}
							 rowKey="key"
				/>
				<FormCreateModal visible={this.state.modalVisible}
												 onCancel={this.hideModal}
												 createForm={this.createForm}

				/>
			</div>
		)
	}
}

export default FormModel;
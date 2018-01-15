import React, { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { tree, update, create } from '../services/CustomerGroup';
import CustomerGroupForm from '../components/CustomerGroupForm';

const defaultExpandedRowKeys = ['root'];

class CustomerGroup extends PureComponent{
	state = {
		data: [],
		loading: false,
		modalVisible: false,
		modalMode: '',
		record: {}
	}
	componentDidMount(){
		this.fetch();
	}
	fetch = () => {
		this.setState({ loading: true });
		tree().then(({ success, data}) => {
			if (success){
				this.setState({
					loading: false,
					data: [data]
				});
			}
		})
	}
	hideModal = () => {
		this.setState({ modalVisible: false });
	}
	addRecord = (id) => {
		this.setState({
			modalMode: 'add',
			modalVisible: true,
			record: {
				parentId: id,
				isGroup: false,
				status: 1
			}
		});
	}
	updateRecord = (record) => {
		this.setState({
			modalMode: 'update',
			modalVisible: true,
			record
		});
	}
	submit = (record) => {
		this.setState({ loading: true });
		if(this.state.modalMode === 'update'){
			update(record).then(({success,data}) => {
				if(success){
					this.setState({ modalVisible: false });
					this.fetch();
				}else{
					this.setState({ loading: false });
				}
			})
		}else{
			create(record).then(({success,data}) => {
				if(success){
					this.setState({ modalVisible: false });
					this.fetch();
				}
			})
		}
	}
	render() {
		const columns = [{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			width: '20%'
		}, {
			title: '是否组节点',
			key: 'isGroup',
			width: '20%',
			render: (text, record) => (
				<span>
      {record.isGroup ? '是' : '否'}
    </span>
			)
		}, {
			title: '状态',
			key: 'status',
			width: '20%',
			render: (text, record) => (
				<div>
					{record.status === 1 ?
						<Tag color="green">有效</Tag> :
						<Tag color="red">无效</Tag>
					}
				</div>
			)
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<div>
					{record.id === 'root' ? (
						<a onClick={(e) => {
							e.preventDefault();
							this.addRecord(record.id);
						}}>添加子项</a>
					) : (
						<div>
							<a onClick={(e) => {
								e.preventDefault();
								this.updateRecord(record);
							}}>修改</a>
							<span className="ant-divider" />
							<a onClick={(e) => {
								e.preventDefault();
								this.addRecord(record.id);
							}} disabled={!record.isGroup}>添加子项</a>
						</div>
					)}
				</div>
			)
		}]
		return (
			<div>
				<Table loading={this.state.loading}
				       columns={columns}
				       dataSource={this.state.data}
				       rowKey={record => record.id}
				       defaultExpandedRowKeys={defaultExpandedRowKeys}
				       pagination={false}
				       size="middle"
				/>
				<CustomerGroupForm
					visible={this.state.modalVisible}
					onCancel={this.hideModal}
					mode={this.state.modalMode}
					record={this.state.record}
					submit={this.submit}
					loading={this.state.loading}
				/>
			</div>
		)
	}
}

export default CustomerGroup;

import React,{ PureComponent } from 'react';
import {Table, Popconfirm, Button, Divider} from 'antd';
import UnitForm from '../components/UnitForm';
import {readAllUnit,deleteOneUnit,createOneUnit,updateOneUnit} from '../services/Unit';

class Unit extends PureComponent{
	columns = [{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '符号',
		dataIndex: 'sign',
		key: 'sign',
	}, {
		title: '操作',
		key: 'action',
		render: (text, record) => (
			<span>
      	<a onClick={() => this.showUpdateUnitModal(record)}>修改</a>
				<Divider type="vertical" />
      	<Popconfirm placement="bottom"
									title={`你确定删除该条记录`}
									onConfirm={() => this.deleteUnit(record.id)}
									okText="确定"
									cancelText="取消">
        	<a className="color-danger">删除</a>
      	</Popconfirm>
			</span>
		)
	}];
	state = {
		modalVisible: false,
		loading: false,
		mode: '',
		unit: {},
		unitList: []
	}
	fetch = () => {
		this.setState({loading : true});
		readAllUnit().then(({data}) => {
			this.setState({
				loading: false,
				modalVisible: false,
				unitList: data
			});
		})
	}
	showCreateUnitModal = () => {
		this.setState({
			modalVisible: true,
			mode: 'create',
			unit: {}
		})
	}
	showUpdateUnitModal = (record) => {
		this.setState({
			modalVisible: true,
			mode: 'update',
			unit: record
		})
	}
	onCancel = () => {
		this.setState({
			modalVisible: false
		})
	}
	onOk = (data) => {
		if(this.state.mode === 'create'){
			createOneUnit(data).then(({success}) => {
				this.fetch()
			})
		}else{
			updateOneUnit(data).then(() => {
				this.fetch()
			})
		}
	}
	deleteUnit = (unitId) => {
		deleteOneUnit(unitId).then(({success}) => {
			console.log(success)
			if(success){
				this.fetch();
			}
		})
	}
	componentDidMount(){
		this.fetch();
	}
	render(){
		return (
			<div>
				<div className="table-title">
					<span>单位列表</span>
					<span className="table-title-operations">
            <Button type="primary" onClick={this.showCreateUnitModal}>新增</Button>
          </span>
				</div>
				<Table dataSource={this.state.unitList}
							 columns={this.columns}
							 size="middle"
							 rowKey="id"
							 loading={this.state.loading}
							 pagination={false}/>
				<UnitForm visible={this.state.modalVisible}
									mode={this.state.mode}
									unit={this.state.unit}
									onCancel={this.onCancel}
									onOk={this.onOk}
				/>
			</div>
		)
	}
}

export default Unit;
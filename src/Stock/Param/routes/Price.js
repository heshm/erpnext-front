import React, { PureComponent } from 'react';
import { Table, Icon } from 'antd';
import {list} from '../services/Price';

class Price extends PureComponent{
	state = {
		loading: false,
		data: []
	}
	fetch = () => {
		this.setState({loading: true})
		list().then(({data}) => {
			this.setState({
				loading: false,
				data
			})
		})
	}

	componentDidMount() {
		this.fetch();
	}

	render(){
		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		}, {
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: '默认币别',
			dataIndex: 'currency',
			key: 'currency'
		}, {
			title: '采购',
			key: 'buying',
			render: (text,record) => (
				record.buying === 1 ?
					<Icon type="check-circle-o" style={{ fontSize: 20, color: '#08c' }} /> :
					<Icon type="close-circle-o" style={{ fontSize: 20, color: 'red' }}/>
			)
		}, {
			title: '销售',
			key: 'selling',
			render: (text,record) => (
				record.selling === 1 ?
					<Icon type="check-circle-o" style={{ fontSize: 20, color: '#08c' }} /> :
					<Icon type="close-circle-o" style={{ fontSize: 20, color: 'red' }}/>
			)
		}, {
			title: '状态',
			key: 'enabled',
			render: (text,record) => (
				record.enabled === 1 ? '有效' : '无效'
			)
		}];
		return (
			<div>
				<Table
					columns={columns}
					dataSource={this.state.data}
					loading={this.state.loading}
					rowKey={record => record.id}
				/>
			</div>
		)
	}
}

export default Price;
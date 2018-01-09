import React,{PureComponent} from 'react';
import { Table, Popconfirm, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {getAllMenu,deleteMenu} from '../services/DevMenu';

class DevMenu extends PureComponent{
	columns = [{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		width: '30%'
	}, {
		title: '图标',
		key: 'iconCls',
		width: '10%',
		render: (text, record) => (
			<Icon type={record.iconCls} style={{fontSize : '18px'}}/>
		)
	}, {
		title: '地址',
		dataIndex: 'actionUrl',
		key: 'actionUrl',
		width: '20%'
	}, {
		title: '排序',
		dataIndex: 'sequence',
		key: 'sequence',
	}, {
		title: '操作',
		key: 'action',
		render: (text, record) => (
			<span>
				<Link to={`/developer/menu/${record.parentMenu.id}/${record.id}`} >修改</Link>
      	<span className="ant-divider" />
      	<Link to={`/developer/menu/${record.id}`} >添加下级</Link>
     	 	<span className="ant-divider" />
      	<Popconfirm placement="bottom"
                  	title={`你确定删除该条记录`}
                  	okText="确定"
                  	cancelText="取消"
                  	onConfirm={
	                  	(e) => {
		                  	deleteMenu(record.id).then(() => {
		                  		this.fetch();
		                  	})
	                  	}
                  	}
      	>
        <a className="color-danger">删除</a>
      	</Popconfirm>
    </span>
		)
	}];
	state = {
		menuTreeList: [],
		loading: false
	}
	fetch = () => {
		this.setState({loading : true});
		getAllMenu().then(({data}) => {
			this.setState({
				loading: false,
				menuTreeList: data
			});
		})
	}
	componentDidMount(){
		this.fetch()
	}
	render(){
		return (
			<div>
				<Table dataSource={this.state.menuTreeList}
				       columns={this.columns}
				       size="middle"
				       rowKey="id"
				       loading={this.state.loading}
				       pagination={false}/>
			</div>
		)
	}
}

export default DevMenu;
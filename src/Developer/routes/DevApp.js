import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import { getAllApplication } from '../services/DevApp';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '图标',
    key: 'icon',
    render: (text, record) => (
      <Icon type={record.icon} style={{fontSize : '18px'}}/>
    )}, {
    title: '排序',
    dataIndex: 'sequence',
    key: 'sequence',
  }, {
    title: '权限',
    dataIndex: 'perm',
    key: 'perm',
  }
]

class DevApp extends Component{

  state = {
    appList: []
  }

  componentDidMount(){
    getAllApplication().then(result => {
      this.setState({
        appList : result.data
      })
    })
  }

  render(){
    return (
      <div>
        <Table dataSource={this.state.appList}
               columns={columns}
               rowKey="id"
               size="middle"
               pagination={false}
        />
      </div>
    )
  }
}
export default DevApp;

import React, { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { list } from '../services/Warehouse';

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address'
}, {
  title: '电话',
  dataIndex: 'phoneNo',
  key: 'phoneNo'
}, {
  title: '状态',
  key: 'status',
  render: (text, record) =>(
    <span>
        {record.status === '1' ?
          <Tag color="green">有效</Tag> :
          <Tag color="red">无效</Tag>}
      </span>
  )
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`warehouse/${record.id}`}>详细</Link>
    </span>
  )
}]

class Warehouse extends PureComponent {
  state = {
    data: [],
    loading: false
  }
  componentDidMount() {
    this.fetch();
  }
  fetch = () => {
    this.setState({ loading: true });
    list().then(({success, data}) => {
      if (success){
        this.setState({
          loading: false,
          data
        });
      }
    })
  }

  render() {
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

export default Warehouse;

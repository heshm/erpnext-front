import React, { PureComponent } from 'react';
import { Card, Table, Tag, Button } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import { listOne } from '../services/Warehouse';

const { Description } = DescriptionList;

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '核算科目',
  dataIndex: 'accountTitle',
  key: 'accountTitle'
}, {
  title: '状态',
  key: 'status',
  render: (text, record) => (
    <span>
      {record.status ?
        <Tag color="green">有效</Tag> :
        <Tag color="red">无效</Tag>
      }
    </span>
  )
}]

class WarehouseDetail extends PureComponent{
  state = {
    warehouse: {},
    loading: false
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetch(id);
  }
  fetch = (id) => {
    this.setState({ loading: true });
    listOne(id).then(({success, data}) => {
      if (success){
        this.setState({
          loading: false,
          warehouse: data
        });
      }
    })
  }
  render(){
    const { name, phoneNo, mobileNo, address, entryList} = this.state.warehouse;
    return (
      <div>
        <Card loading={this.state.loading} bordered={false}>
          <DescriptionList size="large" title="仓库详细" col={2}>
            <Description term="名称">{name}</Description>
            <Description term="电话号码">{phoneNo}</Description>
            <Description term="手机">{mobileNo}</Description>
            <Description term="地址">{address}</Description>
          </DescriptionList>
        </Card>
        <Table
          columns={columns}
          dataSource={entryList}
          pagination={false}
          size="middle"
          bordered
          loading={this.state.loading}
          rowKey={record => record.id}
        />
        <Button
          style={{ marginTop: 32 }} onClick={() => {
          this.props.history.go(-1);
        }}>返回</Button>
      </div>
    )
  }
}

export default WarehouseDetail;

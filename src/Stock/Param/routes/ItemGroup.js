import React,{ PureComponent } from 'react';
import { Table, Tag } from 'antd';
import ItemGroupForm from '../components/ItemGroupForm';
import {getAllItemGroup,create,update} from '../services/ItemGroup'

class ItemGroup extends PureComponent{
  columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '30%'
  }, {
    title: '是否组节点',
    key: 'isGroup',
    width: '10%',
    render: (text, record) =>(
      <span>
        {record.isGroup ? '是' : '否'}
      </span>
    )
  }, {
    title: '状态',
    key: 'status',
    width: '10%',
    render: (text, record) =>(
      <span>
        {record.status === 1 ?
          <Tag color="green">有效</Tag> :
          <Tag color="red">无效</Tag>}
      </span>
    )
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div>
        <a disabled={!record.isGroup || record.status === 0} onClick={(e) => {
          e.preventDefault();
          this.setState({
            modalVisible: true,
            mode: 'create',
            itemGroup: {
              parentName: record.name,
              parentId: record.id,
              isGroup: false,
              status: 1
            }
          })
        }}>添加下级</a>
        {record.id !== 'root' ?
          (
            <span>
              <span className="ant-divider" />
              <a onClick={(e) => {
                e.preventDefault();
                this.setState({
                  modalVisible: true,
                  mode: 'update',
                  itemGroup: record
                })
              }}>修改</a>
            </span>
          ) : ''
        }
      </div>
    )
  }]
  state = {
    modalVisible: false,
    mode: '',
		loading: false,
    itemGroup: {},
    itemGroupList: []
  }
  onCancle = () => {
    this.setState({
      modalVisible: false,
      itemGroup: {}
    })
  }
  onOk = (itemGroup) => {
    if(this.state.mode === 'update'){
      update(itemGroup).then(() => {
        this.fetch()
      })
    }else{
      create(itemGroup).then(() => {
				this.fetch()
			})
    }
  }
  fetch = () => {
		this.setState({loading : true});
		getAllItemGroup().then(({data}) => {
			this.setState({
        loading: false,
				itemGroupList: data,
				modalVisible: false
			});
    })
  }
	componentDidMount(){
    this.fetch();
  }
  render(){
    return(
      <div>
        <Table dataSource={this.state.itemGroupList}
               columns={this.columns}
               size="middle"
               rowKey="id"
               loading={this.state.loading}
               pagination={false}
        />
        <ItemGroupForm
          visible={this.state.modalVisible}
          onCancle={this.onCancle}
          itemGroup={this.state.itemGroup}
          onOk={this.onOk}
        />
      </div>
    )
  }
}

export default ItemGroup;

import React,{ PureComponent } from 'react';
import { Table, Tabs, Tag  } from 'antd';
import AreaFrom from '../components/AreaForm';

import { tree, create, update, treeData } from '../services/Area';

const TabPane = Tabs.TabPane;

class Area extends PureComponent{
  state = {
    loading: false,
    data: [],
    area: {},
    activeTab: ''
  }
  fetch = () => {
    this.setState({loading : true});
    tree('root').then(({data}) => {
      this.setState({
        loading : false,
        data: [data],
        activeTab: 'list'
      });
    })
  }
  handleTabChange = (key) => {
    if(key === 'list'){
      this.setState({
        area: {}
      });
    }
    this.setState({
      activeTab: key
    });
  }
  submit = (area) => {
    this.setState({loading : true});
    if(this.state.area.id ){
      update(area).then(({success,data}) => {
        if(success){
          this.fetch();
        }
      })
    }else{
      create(area).then(({success,data}) => {
        if(success){
          this.fetch();
        }else{
          this.setState({loading : false});
        }
      })
    }
  }
  onExpand = (expanded, record) => {
    if(record.children.length === 0 && expanded){
      this.setState({loading : true});
      tree(record.id).then(({data}) => {
        record.children = data.children;
        this.setState({loading : false});
      })
    }
  }
  componentDidMount(){
    treeData().then(({success,data}) => {
      this.setState({
        areaData: [{
          value: 'root',
          label: '中国',
          children: data
        }]
      });
    })
    this.fetch();
  }
  render(){
    const columns = [
      {
        title: '区域名称',
        key: 'name',
        width: '20%',
        render: (text, record) => (
          <span>
            <a disabled={record.id === 'root'} onClick={(e) => {
              e.preventDefault();
              this.setState({
                area: record,
                activeTab: 'modi'
              })
            }}>{record.name}</a>
          </span>
        )
      }, {
        title: '行政代码',
        dataIndex: 'id',
        width: '20%',
        key: 'id'
      }, {
        title: '区域类型',
        dataIndex: 'typeName',
        width: '20%',
        key: 'typeName'
      }, {
        title: '备注',
        dataIndex: 'remark',
        width: '20%',
        key: 'remark'
      }, {
        title: '是否有效',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <span>
            {record.delFlg ?
              <Tag color="red">无效</Tag> :
              <Tag color="green">有效</Tag>
            }
          </span>
        )
      }
    ];
    return(
      <div>
        <Tabs defaultActiveKey="list"
              activeKey={this.state.activeTab}
              onChange={this.handleTabChange}
        >
          <TabPane tab="区域列表" key="list">
            <Table columns={columns}
                   dataSource={this.state.data}
                   rowKey="id"
                   pagination={false}
                   loading={this.state.loading}
                   size="middle"
                   defaultExpandedRowKeys={['root']}
                   onExpand={this.onExpand}
            />
          </TabPane>
          <TabPane tab={this.state.area.id ? '区域修改' : '区域添加'} key="modi">
            <AreaFrom areaData={this.state.areaData}
                      area={this.state.area}
                      loading={this.state.loading}
                      submit={this.submit}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Area;

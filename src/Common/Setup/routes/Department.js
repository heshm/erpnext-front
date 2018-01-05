import React,{ PureComponent } from 'react';
import { Tabs, Table, Tag, message } from 'antd';
import DepartmentForm from '../components/DepartmentForm';
import { tree, create, update } from '../services/Department';
import { treeData } from '../../Param/services/Area';

const TabPane = Tabs.TabPane;
class Department extends PureComponent{
  state = {
    loading: false,
    list: [],
    areaData: [],
    activeTab: 'list',
    department: {}
  }
  fetch = () => {
    this.setState({
      loading: true,
      department: {}
    });
    tree().then(({data}) => {
      this.setState({
        loading: false,
        list: [data],
        activeTab: 'list'
      });
    })
  }
  handleTabChange = (key) => {
    if(key === 'list'){
      this.setState({
        department: {}
      });
    }
    this.setState({
      activeTab: key
    });
  }
  submit = (depart) => {
    if(depart.id){
      update(depart).then(({success}) => {
        if(success){
          message.success('数据更新成功!');
          this.fetch();
        }
      })
    }else{
      create(depart).then(({success}) => {
        if(success){
          message.success('数据新增成功!');
          this.fetch();
        }
      });
    }
  }
  componentDidMount(){
    treeData().then(({success,data}) => {
      this.setState({
        areaData: data
      });
    })
    this.fetch();
  }
  render(){
    const columns = [
      {
        title: '机构名称',
        width: '20%',
        key: 'name',
        render: (text, record) => (
          <span>
            <a disabled={record.id === 'root'} onClick={() => {
              this.setState({
                department: record,
                activeTab: 'modi'
              })
            }}>{record.name}</a>
          </span>
        )
      }, {
        title: '归属区域',
        dataIndex: 'areaName',
        width: '20%',
        key: 'areaName'
      }, {
        title: '机构编码',
        dataIndex: 'code',
        width: '20%',
        key: 'code'
      }, {
        title: '机构类型',
        dataIndex: 'typeName',
        width: '20%',
        key: 'typeName'
      }, {
        title: '是否有效',
        width: '20%',
        key: 'action',
        render: (text, record) => (
          <span>
            {record.delFlg ?
              <Tag color="red">无效</Tag> :
              <Tag color="green">有效</Tag>}
          </span>
        )
      }
    ];
    return(
      <div>
        <Tabs
          activeKey={this.state.activeTab}
          onChange={this.handleTabChange}
        >
          <TabPane tab="机构列表" key="list">
            <Table
              columns={columns}
              size="middle"
              pagination={false}
              dataSource={this.state.list}
              rowKey="id"
              defaultExpandedRowKeys={['root']}
            />
          </TabPane>
          <TabPane tab={this.state.department.id ? '机构修改' : '机构添加'} key="modi">
            <DepartmentForm
              department={this.state.department}
              departTree={this.state.list}
              areaData={this.state.areaData}
              submit={this.submit}
              loading={this.state.loading}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Department;

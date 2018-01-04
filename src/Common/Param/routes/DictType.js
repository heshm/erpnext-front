import React,{ PureComponent } from 'react';
import { Table, Button } from 'antd';
import DictTypeForm from '../components/DictTypeForm';
import { listDictType, createDictType, updateDictType} from '../services/Dict';

class DictType extends PureComponent{
  state = {
    loading: false,
    data: [],
    modal: false,
    mode: '',
    record: {}
  }
  fetch = () => {
    this.setState({ loading: true });
    listDictType().then(({success, data}) => {
      if (success){
        this.setState({
          loading: false,
          data
        });
      }
    })
  }
  create = () => {
    this.setState({
      mode: 'create',
      record: {
        id: '',
        name: '',
        valueLength: ''
      }
    });
    this.showModal();
  }
  update = (record) => {
    this.setState({
      mode: 'update',
      record
    });
    this.showModal();
  }
  showModal = () => {
    this.setState({
      modal: true
    });
  }
  hideModal = () => {
    this.setState({
      modal: false
    });
  }
  onOk = (values) => {
    this.setState({ loading: true });
    if(this.state.mode === 'update'){
      updateDictType(values).then(({success, data}) => {
        if(success){
          this.setState({ modal: false });
          this.fetch();
        }
      })
    }else{
      createDictType(values).then(({success, data}) => {
        if(success){
          this.setState({ modal: false });
          this.fetch();
        }
      })
    }

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
    },{
      title: '字段长度',
      dataIndex: 'valueLength',
      key: 'valueLength'
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={(e) => {
            e.preventDefault();
            this.update(record)
          }}>修改</a>
        </span>
      )
    }];
    return (
      <div>
        <div className="table-title">
          <span>类别列表</span>
          <span className="table-title-operations">
            <Button type="primary" onClick={this.create}>新增</Button>
          </span>
        </div>
        <Table columns={columns}
               dataSource={this.state.data}
               loading={this.state.loading}
               rowKey={record => record.id}
        />
        <DictTypeForm mode={this.state.mode}
                      visible={this.state.modal}
                      onCancel={this.hideModal}
                      dictType={this.state.record}
                      onOk={this.onOk}
        />
      </div>
    )
  }
}
export default DictType;

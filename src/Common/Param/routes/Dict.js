import React,{ PureComponent } from 'react';
import { Card, Form, Table, Select } from 'antd';

import { listDictType, pageList} from '../services/Dict';

const FormItem = Form.Item;
const Option = Select.Option;

const getOptions = (typeList) => {
  return typeList.map(item => {
    return (
      <Option value={item.id} key={item.id}>{item.name}</Option>
    )
  })
}


class Dict extends PureComponent {
  state = {
    loading: false,
    typeList: [],
    data: [],
    pagination: {
      current: 1
    },
    dictType: ''
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      loading: true,
      pagination: pager
    },() => {
      this.fetch();
    })
  }
  fetch = () => {
    this.setState({loading : true});
    pageList(this.state.dictType,this.state.pagination.current - 1 ).then(({data}) => {
      const pagination = { ...this.state.pagination };
      pagination.total = data.totalElements;
      pagination.current = data.number + 1;
      this.setState({
        loading: false,
        data: data.content,
        pagination
      });
    })
  }
  onSelectChange = (e) => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      dictType : e,
      pagination: pager
    },() => {
      this.fetch();
    })
  }
  componentDidMount(){
    listDictType().then(({success,data}) => {
      if(success){
        this.setState({
          loading: true,
          typeList: data
        });
        this.fetch();
      }
    })
  }
  render(){
    const columns = [
      {
        title: '类别',
        dataIndex: 'type.name',
        key: 'type.name'
      },{
        title: '值',
        dataIndex: 'dictValue',
        key: 'dictValue'
      },{
        title: '名称',
        dataIndex: 'dictLabel',
        key: 'dictLabel'
      }
    ];
    return (
      <div>
        <Card bordered={false}
              title="字典列表"
              extra={<a disabled={true} onClick={(e) => {
                e.preventDefault();
              }}>添加</a>}
        >
          <Form layout="inline"
                style={{textAlign: 'center'}}
          >
            <FormItem label="字典类型">
              <Select style={{ width: 180 }} onChange={this.onSelectChange}>
                {getOptions(this.state.typeList)}
              </Select>
            </FormItem>
          </Form>
        </Card>
        <Table columns={columns}
               loading={this.state.loading}
               dataSource={this.state.data}
               rowKey="dictLabel"
               pagination={this.state.pagination}
               onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default Dict;

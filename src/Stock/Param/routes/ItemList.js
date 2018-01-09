import React,{ PureComponent }  from 'react';
import { Card, Form, Tag, Table, Button, TreeSelect } from 'antd';
import ItemForm from '../components/ItemForm';
import {getChildItemGroup} from '../services/ItemGroup';
import {readAllUnit} from '../../../Common/Param/services/Unit';
import {list,listOne,create,update} from '../services/Item';

const FormItem = Form.Item;

const getSelectTreeData = (treeData) => {
	return treeData.map(item => {
		if(item.children){
			return {
				label: item.name,
				key: item.id,
				value: item.id,
				children: getSelectTreeData(item.children)
			}
		} else {
			return {
				label: item.name,
				key: item.id,
				value: item.id
			}
		}
	})
}

class ItemList extends PureComponent{
  state = {
    loading: false,
		itemList: [],
		itemGroup: [],
		unitList: [],
    formModal: false,
    modalMode: '',
    item: {}
  }
	columns = [{
		title: 'ID',
		dataIndex: 'itemId',
		key: 'itemId'
	},{
		title: '名称',
		dataIndex: 'name',
		key: 'name'
	},{
		title: '单位',
		dataIndex: 'unit',
		key: 'unit'
	},{
		title: '规格',
		dataIndex: 'norm',
		key: 'norm'
	},{
		title: '计量小数位数',
		dataIndex: 'decNo',
		key: 'decNo'
	},{
		title: '状态',
		dataIndex: 'status',
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
      <span>
        <a onClick={(e) => {
					e.preventDefault();
					this.showModal('update',record.itemId);
				}}>修改</a>
      </span>
		)
	}];
  init = () => {
    this.setState({loading: true})
		getChildItemGroup('root').then(({data}) => {
		  this.setState({
				itemGroup: data
      })
			readAllUnit().then(({data}) => {
				this.setState({
					unitList: data,
          loading: false
				})
      })
    })
  }
  showModal = (mode,itemId = '') => {
    if(mode === 'update'){
			listOne(itemId).then(({data}) => {
				this.setState({
					item: data,
					formModal: true,
					modalMode: mode
				})
      })
    }else{
			this.setState({
				formModal: true,
				modalMode: mode,
				item: {}
			})
    }
  }
  fetch = (itemGroupId) => {
    this.setState({loading: true});
		list(itemGroupId).then(({data}) => {
		  this.setState({
        loading: false,
				itemList: data,
        formModal: false
      })
    })
  }
  listItem = (e) => {
    e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if(!errors){
        const {itemGroupId} = values;
        this.fetch(itemGroupId)
			}
		})
  }
  hideModal = () => {
    this.setState({formModal: false})
  }
	updateItem = (item) => {
    update(item).then(() => {
      this.fetch(item.itemGroupId)
    })
  }
  createItem = (item) => {
    create(item).then(() => {
			this.fetch(item.itemGroupId)
    })
  }
	componentDidMount(){
    this.init()
  }
  render(){
	  const {getFieldDecorator} = this.props.form;
    return(
      <div>
        <Card
          bordered={false}
          title="货品列表"
          extra={<a onClick={(e) => {
						e.preventDefault();
						this.showModal('add')
					}}>添加</a>}
        >
          <Form
            layout="inline"
            style={{textAlign: 'center'}}
            onSubmit={this.listItem}
          >
            <FormItem label="货品群组">
							{getFieldDecorator('itemGroupId',{
								rules: [{ required: true, message: '请选择货品!' }]
							})(
                <TreeSelect
                  style={{ width: 250 }}
                  treeData={getSelectTreeData(this.state.itemGroup)}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择货品"
                  filterTreeNode={true}
                />
							)}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >查询</Button>
            </FormItem>
          </Form>
        </Card>
        <Table dataSource={this.state.itemList}
               columns={this.columns}
               size="middle"
               rowKey="itemId"
               loading={this.state.loading}
               pagination={false}/>
        <ItemForm
          visible={this.state.formModal}
          onCancel={this.hideModal}
          modalMode={this.state.modalMode}
          item={this.state.item}
          treeData={getSelectTreeData(this.state.itemGroup)}
          unitList={this.state.unitList}
          updateItem={this.updateItem}
          createItem={this.createItem}
          loading={this.state.loading}
        />
      </div>
    )
  }
}
export default Form.create()(ItemList);
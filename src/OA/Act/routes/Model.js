import React, { PureComponent } from 'react';
import { Form, Button, Card, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import {list} from '../services/Model';
import {server_path} from '../../../utils/Config';

const FormItem = Form.Item;
class Model extends PureComponent{
	state = {
		loading: false,
		data: []
	}
	fetch = (params) => {
		this.setState({loading: true});
		list(params).then(({ data }) => {
			this.setState({
				loading: false,
				data
			})
		})
	}
	componentDidMount(){
		this.fetch({});
	}
	render(){
		const columns = [
			{
				title: 'ID',
				dataIndex: 'key',
				key: 'key'
			}, {
				title: '名称',
				dataIndex: 'name',
				key: 'name'
			}, {
				title: '版本',
				dataIndex: 'version',
				key: 'version'
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a href={`${server_path}/static/activiti/editor/index.html#/editor/${record.id}`} target="_blank">编辑</a>
						<span className="ant-divider" />
						<Link to={`/developer/menu`} >导出</Link>
          </span>
				)
			}];
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Card bordered={false}>
					<Form layout="inline" style={{textAlign: 'center'}}
					      onSubmit={this.handleSubmit}
					>
						<FormItem label="所属系统">
							{getFieldDecorator('departmentId')(
								<Input />
							)}
						</FormItem>
						<FormItem label="名称">
							{getFieldDecorator('name')(
								<Input />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" icon="search">查询</Button>
						</FormItem>
					</Form>
				</Card>
				<div className="table-title">
					<span>权限列表</span>
					<span className="table-title-operations">
            <Button type="primary" size="small">新增</Button>
						<Button type="primary" size="small">导入</Button>
          </span>
				</div>
				<Table columns={columns}
				       size="middle"
				       dataSource={this.state.data}
				       rowKey="key"
				>
				</Table>
			</div>
		)
	}
}

export default Form.create()(Model);
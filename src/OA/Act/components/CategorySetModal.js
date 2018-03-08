import React,{PureComponent} from 'react';
import { Modal, Select } from 'antd';

const getSelectOption = (appList) => {
	return appList.map((item) => {
		return (
			<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
		)
	})
}
class CategorySetModal extends PureComponent{
	render(){
		return(
			<Modal title="设置分类"
			       onCancel={this.props.onCancle}
			       visible={this.props.visible}
				   width={350}
				   onOk={this.props.onOk}
			>
				<Select defaultValue={this.props.category.appId} 
						style={{ width: 300 }}
						onChange={this.props.selectChange}
				>
					{getSelectOption(this.props.appList)}
				</Select>
			</Modal>
		)
	}
}

export default CategorySetModal;
import React,{PureComponent} from 'react';
import { Modal, Select } from 'antd';

const getSelectOption = (appList) => {
	return appList.map((item) => {
		return (
			<Select.Option value={item.id}>{item.name}</Select.Option>
		)
	})
}
class CategorySetModal extends PureComponent{
	state = {
		appId: ''
	}
	render(){
		return(
			<Modal title="设置分类"
			       onCancel={this.props.onCancle}
			       visible={this.props.visible}
			       width={350}
			>
				<Select defaultValue={this.props.category} style={{ width: 300 }}>
					{getSelectOption(this.props.appList)}
				</Select>
			</Modal>
		)
	}
}

export default CategorySetModal;
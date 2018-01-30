import React,{PureComponent} from 'react';
import { Modal,message } from 'antd';
import UserList from '../routes/UserList'

class UserSelect extends PureComponent{
	state = {
		user: {}
	}
	onOk = () => {
		if(this.state.user.userId){
			this.props.selectOk(this.state.user)
		}else{
			message.warn('必须选择一个用户!');
		}
	}
	onSelect = (record) => {
		this.setState({user:record})
	}
	render(){
		return (
			<Modal visible={this.props.visible}
						 width={800}
						 onCancel={this.props.onCancle}
						 onOk={this.onOk}
			>
				<UserList modal={true} onSelect={this.onSelect}/>
			</Modal>
		)
	}
}

export default UserSelect;
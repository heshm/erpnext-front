import React from 'react';
import { Modal } from 'antd';
import UserList from '../routes/UserList'

const UserSelect =
	({
		 visible,
		 onCancle
	}) => {
	return (
		<Modal visible={visible}
					 width={800}
					 onCancel={onCancle}
		>
			<UserList modal={true}/>
		</Modal>
	)
}

export default UserSelect;
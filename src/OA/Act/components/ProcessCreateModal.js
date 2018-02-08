import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const ProcessCreateModal = ({
	visible,
	onCancel,
	form: {
		getFieldDecorator
	}
}) => {
	return (
		<Modal title="新建流程"
					 onCancel={onCancel}
					 visible={visible}
		>
			<Form>
				<FormItem label="名称">
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入名称!' }]
					})(
						<Input />
					)}
				</FormItem>
				<FormItem label="ID">
					{getFieldDecorator('key', {
						rules: [{ required: true, message: '请输入ID!' }]
					})(
						<Input />
					)}
				</FormItem>
				<FormItem label="描述">
					{getFieldDecorator('description')(
						<Input.TextArea rows={3}/>
					)}
				</FormItem>
			</Form>
		</Modal>
	)
}

export default Form.create()(ProcessCreateModal);
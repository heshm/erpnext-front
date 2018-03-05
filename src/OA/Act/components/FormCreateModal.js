import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const FormCreateModal = ({
	visible,
	onCancel,
	createForm,
	form: {
		getFieldDecorator,
		validateFields
	}
}) => {
	const onOk = () => {
		validateFields((errors, values) => {
			if (!errors) {
				createForm(values)
			}
		})
	}
	return (
		<Modal title="新建表单"
					 onCancel={onCancel}
					 visible={visible}
		       onOk={onOk}
		>
			<Form>
				{getFieldDecorator('modelType', {
					initialValue: '2'
				})(
					<Input type="hidden"/>
				)}
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

export default Form.create()(FormCreateModal);
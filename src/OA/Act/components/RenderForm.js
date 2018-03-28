import React from 'react';
import moment from 'moment';
import {Form, Button, Input, DatePicker, Divider, Radio} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 8},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 8},
	},
}
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 14,
			offset: 8,
		},
	},
};
const renderFields = (fields = [], getFieldDecorator) => {
	return fields.map(field => {
		if (field.type === 'date') {
			if (field.value === null) {
				return (
					<FormItem label={field.name} {...formItemLayout} key={field.id}>
						{getFieldDecorator(`${field.id}`, {
							rules: [
								{required: field.required},
							]
						})(
							<DatePicker/>
						)}
					</FormItem>
				)
			} else {
				return (
					<FormItem label={field.name} {...formItemLayout} key={field.id}>
						{getFieldDecorator(`${field.id}`, {
							initialValue: moment(field.value, 'YYYY-MM-DD')
						}, {
							rules: [
								{required: field.required},
							]
						})(
							<DatePicker/>
						)}
					</FormItem>
				)
			}
		} else {
			return (
				<FormItem label={field.name} {...formItemLayout} key={field.id}>
					{getFieldDecorator(`${field.id}`, {
						initialValue: field.value
					}, {
						rules: [
							{required: field.required},
						]
					})(
						renderInput(field.type)
					)}
				</FormItem>
			)
		}
	})
}
const renderInput = (type) => {
	switch (type) {
		case 'multi-line-text' :
			return (
				<Input.TextArea/>
			)
		case 'text' :
			return (
				<Input/>
			)
		default:
			return (
				<Input/>
			)
	}
}

const renderProperty = (type) => {
	return renderInput(type.name)
}
const renderProperties = (properties = [], getFieldDecorator) => {
	return properties.map(property => {
		if(property.type.name === 'boolean'){
			return (
				<FormItem label={property.name} {...formItemLayout} key={property.id}>
					{getFieldDecorator(`${property.id}`, {
						initialValue: property.value === null ? true : property.value
					})(
						<Radio.Group>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</Radio.Group>
					)}
				</FormItem>
			)
		}else {
			return (
				<FormItem label={property.name} {...formItemLayout} key={property.id}>
					{getFieldDecorator(`${property.id}`, {
						initialValue: property.value
					}, {
						rules: [
							{required: property.required},
						]
					})(
						renderProperty(property.type)
					)}
				</FormItem>
			)
		}
	})
}
const RenderForm = ({
						fields,
						formProperties,
						submit,
						form: {
							getFieldDecorator,
							validateFields
						}

					}) => {
	const onSubmit = (e) => {
		e.preventDefault();
		validateFields((errors, values) => {
			if (!errors) {
				for (let field in values) {
					if (typeof values[field] === 'object' && (values[field] !== null)) {
						values[field] = values[field].format('YYYY-MM-DD')
					}
				}
				submit(values);
			}
		})
	}
	return (
		<Form onSubmit={onSubmit}>
			{renderFields(fields, getFieldDecorator)}
			<Divider type="horizontal"/>
			{renderProperties(formProperties, getFieldDecorator)}
			<FormItem {...tailFormItemLayout}>
				<Button type="primary"
						htmlType="submit"
				>提交</Button>
			</FormItem>
		</Form>
	)
}

export default Form.create()(RenderForm);

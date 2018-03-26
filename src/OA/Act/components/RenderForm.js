import React from 'react';
import moment from 'moment';
import {Form,Button,Input,DatePicker} from 'antd';


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
const renderForm = (fields = [],getFieldDecorator) => {
	return fields.map(field => {
		if(field.type === 'date'){
			if(field.value === null){
				return (
					<FormItem label={field.name} {...formItemLayout} key={field.id}>
						{getFieldDecorator(`${field.id}`,{
							rules: [
								{ required: field.required},
							]
						})(
							<DatePicker />
						)}
					</FormItem>
				)
			}else {
				return (
					<FormItem label={field.name} {...formItemLayout} key={field.id}>
						{getFieldDecorator(`${field.id}`,{
							initialValue: moment(field.value)
						},{
							rules: [
								{ required: field.required },
							]
						})(
							<DatePicker />
						)}
					</FormItem>
				)
			}
		}else {
			return (
				<FormItem label={field.name} {...formItemLayout} key={field.id}>
					{getFieldDecorator(`${field.id}`,{
						initialValue: field.value
					},{
						rules: [
							{ required: field.required},
						]
					})(
						renderInput(field)
					)}
				</FormItem>
			)
		}
	})
}
const renderInput = (field) => {
	switch (field.type){
		case 'multi-line-text' :
			return (
				<Input.TextArea />
			)
		case 'text' :
			return (
				<Input />
			)
		default:
			return (
				<Input />
			)
	}
}
const RenderForm = ({
											fields,
											submit,
											form: {
												getFieldDecorator,
												validateFields
											}

										}) => {
	const onSubmit = (e) => {
		e.preventDefault();
		validateFields((errors, values) => {
			if(!errors){
				for(let field in values){
					if(typeof values[field] === 'object'){
						values[field] = values[field].format('YYYY-MM-DD')
					}
				}
				submit(values);
			}
		})
	}
	return (
		<Form onSubmit={onSubmit}>
			{renderForm(fields,getFieldDecorator)}
			<FormItem {...tailFormItemLayout}>
				<Button type="primary"
								htmlType="submit"
				>提交</Button>
			</FormItem>
		</Form>
	)
}

export default Form.create()(RenderForm);

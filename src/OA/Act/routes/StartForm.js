import React, {PureComponent} from 'react';
import {Card, Form, Button, DatePicker, Input, message} from 'antd';
import {listOne} from '../services/Process';
import {getStartForm} from '../services/Form';
import {newTaskWithForm} from '../services/Task';
import RenderForm from '../components/RenderForm';

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
const renderForm = (fields = [], getFieldDecorator) => {
	return fields.map(field => {
		return (
			<FormItem label={field.name} {...formItemLayout} key={field.id}>
				{getFieldDecorator(`${field.id}`, {
					rules: [
						{required: field.required},
					]
				})(
					renderInput(field)
				)}
			</FormItem>
		)
	})
}
const renderInput = (field) => {
	switch (field.type) {
		case 'date' :
			return (
				<DatePicker/>
			)
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

class StartForm extends PureComponent {
	state = {
		loading: false,
		processInfo: {
			name: ''
		},
		formInfo: {}
	}
	submit = (values) => {
		newTaskWithForm(this.props.match.params.processDefId, values).then(({success}) => {
			if (success) {
				message.success('流程启动成功!')
				this.props.history.push('../processes')
			}
		});
	}
	fetch = () => {
		const {processDefId} = this.props.match.params;
		this.setState({loading: true})
		listOne(processDefId).then(({data}) => {
			const {processDefinition} = data;
			this.setState({
				processInfo: {
					name: processDefinition.name
				}
			});
		})
		getStartForm(processDefId).then(({data}) => {
			this.setState({
				formInfo: data
			});
		})
		this.setState({loading: false})
	}

	componentDidMount() {
		this.fetch();
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Card bordered={false}
						title={this.state.processInfo.name}
						loading={this.state.loading}>
				<RenderForm fields={this.state.formInfo.fields}
										submit={this.submit}/>
			</Card>
		)
	}
}

export default Form.create()(StartForm);
import React, {PureComponent} from 'react';
import {Card, Form, message} from 'antd';
import {listOne} from '../services/Process';
import {getStartForm} from '../services/Form';
import {newTaskWithForm} from '../services/Task';
import RenderForm from '../components/RenderForm';

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
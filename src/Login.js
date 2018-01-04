import React,{ PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Input, Checkbox, Icon } from 'antd';
import {login} from './services/Login';
import {storeLoginData} from './utils';

const FormItem = Form.Item;

class Login extends PureComponent {
	state = {
		loading: false
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if(!errors) {
				this.setState({loading:true})
				login(values).then(({success,data}) => {
					if(success){
						storeLoginData(data);
						this.props.history.push('/')
					}else{
						this.setState({loading:false});
					}
				})
			}
		});
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return (
			<div className="login">
				<div className="login-form" >
					<div className="login-logo">
						<span>ERPNext</span>
					</div>
					<Form style={{maxWidth: '300px'}} onSubmit={this.handleSubmit}>
						<FormItem >
							{getFieldDecorator('username', {
								rules: [{ required: true, message: '请输入用户名!' }],
								initialValue: 'admin'
							})(
								<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码!' }],
								initialValue: 'admin'
							})(
								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: false,
							})(
								<Checkbox>记住我(公共场所慎用)</Checkbox>
							)}
							<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
							<Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
								登录
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}
export default connect()(Form.create()(Login));
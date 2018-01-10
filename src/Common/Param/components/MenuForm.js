import React,{ PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import IconSelect from '../../../components/ui/IconSelect';
import {update,create} from '../../../Common/Param/services/Menu';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 10},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

class MenuForm extends PureComponent{
  state = {
    icon: '',
		iconModal: false
  }
  showModal = () => {
		this.setState({iconModal:true})
	}
  hideModal = () => {
  	this.setState({iconModal:false})
	}
	selectIcon = (icon) => {
  	this.setState({
			icon: icon,
			iconModal: false
		})
		this.props.form.setFieldsValue({iconCls: icon})
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if(!errors){
				console.log(values)
				if(this.props.mode === 'update'){
					update(values).then(({success}) => {
						if(success){
							this.props.history.push('/developer/menu')
						}
					})
				}else{
					create(values).then(() => {
						this.props.history.push('/developer/menu')
					})
				}
			}
		})
	}
	componentDidUpdate(prevProps,prevState){
  	if(prevState.icon === '' && this.props.mode === 'update'){
  		this.setState({
				...this.state,
				icon: this.props.menu.iconCls
			})
		}
	}
  render(){
    const {getFieldDecorator} = this.props.form;
    const iconSelectProps = {
			iconModal: this.state.iconModal,
			onCancle: this.hideModal,
			icon: this.state.icon,
			selectIcon: this.selectIcon
		}
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormItem
						{...formItemLayout}
            label="上级节点">
						{getFieldDecorator('parentName')(
              <Input readOnly />
						)}
          </FormItem>
					{getFieldDecorator('parentId',{
						initialValue: ``
					})(
            <Input type="hidden" />
					)}
					{getFieldDecorator('id')(
            <Input type="hidden" />
					)}
          <FormItem
						{...formItemLayout}
            label="名称">
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入名称!' }]
						})(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="地址">
						{getFieldDecorator('actionUrl')(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="排序">
						{getFieldDecorator('sequence')(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="图标"
          >
            <Row gutter={8}>
              <Col span={2}>
								{getFieldDecorator('iconCls')(
                  <Input type="hidden" />
								)}
                <Icon
									type={this.state.icon}
									style={{ fontSize: 30, color: '#08c' }} />
              </Col>
              <Col span={4}>
                <Button size="small" onClick={() => {
									this.showModal()
								}}>选择</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>

            <Button type="primary" htmlType="submit">提交</Button>

            <Button style={{marginLeft : 20}} onClick={() => {
							this.props.history.push('/developer/menu')
						}}>返回</Button>

          </FormItem>
        </Form>
        <IconSelect {...iconSelectProps}/>
      </div>
    )
  }
}

export default withRouter(Form.create({
	mapPropsToFields(props){
    if(props.mode === 'update'){
	    return {
				parentName: Form.createFormField({
					value: props.menu.parentMenu.name
				}),
				parentId: Form.createFormField({
					value: props.menu.parentMenu.id
				}),
				id: Form.createFormField({
					value: props.menu.id
				}),
				name: Form.createFormField({
					value: props.menu.name
				}),
				actionUrl: Form.createFormField({
					value: props.menu.actionUrl
				}),
				sequence: Form.createFormField({
					value: props.menu.sequence
				}),
				iconCls: Form.createFormField({
					value: props.menu.iconCls
				})
      }
    }else{
      return {
				parentName: Form.createFormField({
					value: props.menu.name
				}),
				parentId: Form.createFormField({
					value: props.menu.id
				})
      }
    }
  }
})(MenuForm));

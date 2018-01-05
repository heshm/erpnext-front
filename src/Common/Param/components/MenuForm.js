import React,{ PureComponent } from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import IconSelect from '../../../components/ui/IconSelect';

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
  render(){
    const {getFieldDecorator} = this.props.form;
    const {menu} = this.props;
    return (
      <div>
        <Form onSubmit={onSubmit}>
          <FormItem
						{...formItemLayout}
            label="上级节点">
						{getFieldDecorator('parentName',{
							initialValue: `${menu.pmenuName}`
						})(
              <Input readOnly />
						)}
          </FormItem>
					{getFieldDecorator('parentId',{
						initialValue: `${menu.pmenuId}`
					})(
            <Input type="hidden" />
					)}
					{getFieldDecorator('id',{
						initialValue: `${menu.id||''}`
					})(
            <Input type="hidden" />
					)}
          <FormItem
						{...formItemLayout}
            label="名称">
						{getFieldDecorator('name', {
							initialValue: `${menu.name||''}`,
							rules: [{ required: true, message: '请输入名称!' }]
						})(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="地址">
						{getFieldDecorator('actionUrl',{
							initialValue: `${menu.actionUrl||''}`
						})(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="排序">
						{getFieldDecorator('sequence',{
							initialValue: `${menu.sequence||''}`
						})(
              <Input />
						)}
          </FormItem>
          <FormItem
						{...formItemLayout}
            label="图标"
          >
            <Row gutter={8}>
              <Col span={2}>
								{getFieldDecorator('iconCls',{
									initialValue: `${menu.iconCls||''}`
								})(
                  <Input type="hidden" />
								)}
                <Icon type={icon} style={{ fontSize: 30, color: '#08c' }} />
              </Col>
              <Col span={4}>
                <Button size="small" onClick={() => {
									dispatch({
										type: 'common_param_menuForm/showIconSelect'
									})
								}}>选择</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>

            <Button type="primary" htmlType="submit">提交</Button>

            <Button style={{marginLeft : 20}} onClick={() => {
							this.props.history.back();
						}}>返回</Button>

          </FormItem>
        </Form>
        <IconSelect {...iconSelectProps}/>
      </div>
    )
  }
}

export default Form.create()(MenuForm);

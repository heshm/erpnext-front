import React,{ PureComponent } from 'react';
import { Form, Modal, Input, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class CustomerGroupForm extends PureComponent{
  onOk = () => {
    const {validateFields} = this.props.form;
    validateFields((errors, values) => {
      if(!errors){
        this.props.submit(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal visible={this.props.visible}
             onCancel={this.props.onCancel}
             title={this.props.mode === 'update' ? '客户群组修改' : '客户群组新增'}
             onOk={this.onOk}
             confirmLoading={this.props.loading}
      >
        <Form>
          {getFieldDecorator('id')(
            <Input type="hidden" />
          )}
          {getFieldDecorator('parentId')(
            <Input type="hidden" />
          )}
          <FormItem {...formItemLayout}
                    label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '名称必须输入!' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout}
                    label="是否组节点"
          >
            {getFieldDecorator('isGroup')(
              <RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout}
                    label="是否有效"
          >
            {getFieldDecorator('status')(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({
  mapPropsToFields(props){
    const { id, parentId, name, isGroup, status } = props.record;
    return {
      id: Form.createFormField({ value: id }),
      parentId: Form.createFormField({ value: parentId }),
      name: Form.createFormField({ value: name }),
      isGroup: Form.createFormField({ value: isGroup }),
      status: Form.createFormField({ value: status })
    }
  }
})(CustomerGroupForm);

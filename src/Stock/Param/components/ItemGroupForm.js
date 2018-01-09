import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ItemGroupForm =
  ({
     visible,
     onCancle,
     onOk,
     form: {
       getFieldDecorator,
       validateFields
     }
  }) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onOk(values);
      }
    })
  }
  return (
    <Modal
      title="群组修改"
      visible={visible}
      onCancel={onCancle}
      onOk={handleOk}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="上级货品"
        >
          {getFieldDecorator('parentName')(
            <Input readOnly />
          )}
        </FormItem>
        {getFieldDecorator('parentId')(
          <Input type="hidden" />
        )}
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '名称必须输入!' }
            ]
          })(
            <Input />
          )}
        </FormItem>
        {getFieldDecorator('id')(
          <Input type="hidden" />
        )}
        <FormItem
          {...formItemLayout}
          label="是否组节点"
        >
          {getFieldDecorator('isGroup')(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否有效"
        >
          {getFieldDecorator('status')(
            <RadioGroup>
              <Radio value={1}>有效</Radio>
              <Radio value={0}>无效</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  mapPropsToFields(props){
    return {
      parentName: Form.createFormField({
        value: props.itemGroup.parentName
      }),
      parentId: Form.createFormField({
        value: props.itemGroup.parentId
      }),
      name: Form.createFormField({
        value: props.itemGroup.name
      }),
      id: Form.createFormField({
        value: props.itemGroup.id
      }),
      isGroup: Form.createFormField({
        value: props.itemGroup.isGroup
      }),
      status: Form.createFormField({
        value: props.itemGroup.status
      })
    }
  }
})(ItemGroupForm);

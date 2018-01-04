import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const DictTypeForm = ({
  mode,
  visible,
  onCancel,
  onOk,
  form: {
    getFieldDecorator,
    validateFields
  }
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onOk(values)
      }
    })
  }
  return (
    <Modal title={mode === 'create' ? '新增' : '修改'}
           visible={visible}
           onCancel={onCancel}
           onOk={handleOk}
    >
      <Form>
        <FormItem label="ID">
          {getFieldDecorator('id', {
            rules: [
              { required: true, message: '请输入合法的ID!' },
              { max: 3 }
            ]
          })(
            <Input readOnly={mode === 'update'}/>
          )}
        </FormItem>
        <FormItem label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入名称!' }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="字段长度">
          {getFieldDecorator('valueLength', {
            rules: [{ required: true, message: '请输入名称!' }]
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  mapPropsToFields(props){
    return {
      id: Form.createFormField({
				value: props.dictType.id
			}),
      name: Form.createFormField({
        value: props.dictType.name
      }),
      valueLength: Form.createFormField({
        value: props.dictType.valueLength
      })
    };
  }
})(DictTypeForm);

import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item

const UnitForm = ({
                    visible,
                    mode,
                    unit,
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
    <Modal
      title={mode === 'create' ? '新增单位' : '修改单位'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form layout="horizontal">
        <FormItem label="ID">
          {getFieldDecorator('id', {
            rules: [
              { required: true, message: '请输入合法的ID!' },
              { max: 2 }
            ]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入名称!' }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="符号">
          {getFieldDecorator('sign')(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  mapPropsToFields(props){
    return {
      id: Form.createFormField({
				value: props.unit.id
      }),
      name: Form.createFormField({
				value: props.unit.name
			}),
			sign: Form.createFormField({
				value: props.unit.sign
      })
    };
  }
})(UnitForm);

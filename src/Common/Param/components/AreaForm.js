import React from 'react';
import { Form, TreeSelect, Input, Select, Button, Radio  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const getSelectTreeData = (tree) => {
  return tree.map(item => {
    if(item.children){
      return {
        label: item.name,
        key: item.id,
        value: item.id,
        children: getSelectTreeData(item.children)
      }
    } else {
      return {
        label: item.name,
        key: item.id,
        value: item.id
      }
    }
  })
}
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
const AreaForm = ({
                    areaData,
                    area,
                    loading,
                    submit,
                    form: {
                      getFieldDecorator,
                      validateFields
                    }
                  }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      if(!errors){
        submit(values);
      }
    })
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormItem label="上级区域" {...formItemLayout} >
          {getFieldDecorator('parentId', {
            rules: [
              { required: true, message: '请选择上级区域!' },
            ]
          })(
            <TreeSelect
              treeDefaultExpandedKeys={['root']}
              style={{ width: 250 }}
              treeData={areaData}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择上级区域"
              filterTreeNode={true}
            />
          )}
        </FormItem>
        <FormItem label="行政代码" {...formItemLayout} >
          {getFieldDecorator('id', {
            rules: [
              { len: 12, message: '行政代码必须为12位'},
              { required: true, message: '请输入行政代码!'}
            ]
          })(
            <Input readOnly={area.id}/>
          )}
        </FormItem>
        <FormItem label="区域名称" {...formItemLayout} >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请输入名称!' },
            ]
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem label="区域类型" {...formItemLayout} >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: '请选择区域类型!' },
            ]
          })(
            <Select>
              <Option value="1">国家</Option>
              <Option value="2">省份、直辖市</Option>
              <Option value="3">地市</Option>
              <Option value="4">区县</Option>
              <Option value="5">乡镇</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="是否有效" {...formItemLayout} >
          {getFieldDecorator('delFlg', {
            rules: [
              { required: true, message: '必须选择' },
            ]
          })(
            <Radio.Group>
              <Radio value={false}>有效</Radio>
              <Radio value={true}>无效</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="备注" {...formItemLayout} >
          {getFieldDecorator('remark', {
            rules: [
              { max: 200, message: '备注不能超过200个字符!' },
            ]
          })(
            <Input.TextArea />
          )}
        </FormItem>
        {getFieldDecorator('isLeaf')(
          <Input type="hidden"/>
        )}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
                  htmlType="submit"
                  loading={loading}
          >提交</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Form.create({
  mapPropsToFields(props){
    return {
      id: Form.createFormField({
        value: props.area.id
      }),
      parentId: Form.createFormField({
        value: props.area.parentId
      }),
      name: Form.createFormField({
        value: props.area.name
      }),
      type: Form.createFormField({
        value: props.area.type
      }),
      remark: Form.createFormField({
        value: props.area.remark
      }),
      isLeaf: Form.createFormField({
        value: props.area.isLeaf
      }),
      delFlg: Form.createFormField({
        value: props.area.delFlg
      })
    }
  }
})(AreaForm);

import React from 'react';
import { Form, Row, Col, Input, Select, Checkbox,
  TreeSelect, Button, Cascader, Radio  } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
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
      offset: 6,
    },
    md: {
      span: 14,
      offset: 3,
    }
  },
};
const options = [
  { label: '综合部', value: 'general' },
  { label: '市场部', value: 'market' },
  { label: '研发部', value: 'delevop' },
];
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
const DepartmentForm = ({
                          departTree,
                          areaData,
                          department,
                          submit,
                          loading,
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
      <Form layout="horizontal"
            onSubmit={handleSubmit}
      >
        {getFieldDecorator('id')(
          <Input type="hidden"/>
        )}
        <Row gutter={16}>
          <Col md={12} sm={24}>
            <FormItem label="上级机构" {...formItemLayout}>
              {getFieldDecorator('parentId', {
                rules: [{ required: true, message: '请选择上级机构' }],
              })(
                <TreeSelect
                  treeDefaultExpandedKeys={['root']}
                  style={{ width: 250 }}
                  treeData={getSelectTreeData(departTree)}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择上级区域"
                  filterTreeNode={true}
                />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="主要负责人" {...formItemLayout}>
              {getFieldDecorator('primaryPersonName')(
                <Input disabled={true}/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="机构类别" {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择机构类别' }],
              })(
                <Select style={{ width: 150 }}>
                  <Option value="1">公司</Option>
                  <Option value="2">部门</Option>
                  <Option value="3">小组</Option>
                  <Option value="4">其它</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="机构编码" {...formItemLayout}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入机构编码' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="机构级别" {...formItemLayout}>
              {getFieldDecorator('grade', {
                rules: [{ required: true, message: '请选择机构级别' }],
              })(
                <Select style={{ width: 150 }}>
                  <Option value="1">一级</Option>
                  <Option value="2">二级</Option>
                  <Option value="3">三级</Option>
                  <Option value="4">四级</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="归属区域" {...formItemLayout}>
              {getFieldDecorator('areaCode', {
                rules: [{ required: true, message: '请选择归属区域' }],
              })(
                <Cascader options={areaData} changeOnSelect />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="详细地址" {...formItemLayout}>
              {getFieldDecorator('addr', {
                rules: [{ required: true, message: '请输入地址' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="联系电话" {...formItemLayout}>
              {getFieldDecorator('telNo',{
                initialValue: ''
              })(
                <Input addonBefore={(<span>+86</span>)}/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="传真" {...formItemLayout}>
              {getFieldDecorator('faxNo',{
                initialValue: ''
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="电子邮箱" {...formItemLayout}>
              {getFieldDecorator('email',{
                initialValue: ''
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            {department.id ?
              <FormItem label="是否有效" {...formItemLayout}>
                {getFieldDecorator('delFlg')(
                  <RadioGroup>
                    <Radio value={false}>有效</Radio>
                    <Radio value={true}>无效</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              :
              <FormItem label="快速添加下级部门" {...formItemLayout}>
              {getFieldDecorator('param')(
                <CheckboxGroup options={options} />
              )}
              </FormItem>
            }
          </Col>
          <Col md={24}>
            <FormItem label="备注"
                      labelCol={{md:3, sm: 6, xs: 24}}
                      wrapperCol={{sm: 16, xs: 24}}
            >
              {getFieldDecorator('remark',{
                initialValue: ''
              })(
                <Input.TextArea/>
              )}
            </FormItem>
          </Col>
        </Row>
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
    const { department } = props;
    return {
      id:Form.createFormField({
        value: department.id
      }),
      parentId: Form.createFormField({
        value: department.parentId
      }),
      name: Form.createFormField({
        value: department.name
      }),
      areaCode: Form.createFormField({
        value: department.areaCode
      }),
      type: Form.createFormField({
        value: department.type
      }),
      code: Form.createFormField({
        value: department.code
      }),
      grade: Form.createFormField({
        value: department.grade
      }),
      addr: Form.createFormField({
        value: department.addr
      }),
      telNo: Form.createFormField({
        value: department.telNo
      }),
      faxNo: Form.createFormField({
        value: department.faxNo
      }),
      email: Form.createFormField({
        value: department.email
      }),
      remark: Form.createFormField({
        value: department.remark
      }),
      delFlg: Form.createFormField({
        value: department.delFlg
      })
    }
  }
})(DepartmentForm);

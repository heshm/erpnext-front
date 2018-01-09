import React from 'react';
import { Modal, Form, Upload, TreeSelect, Input, Icon, Select, InputNumber, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  }
};
const getUnitOption = (unitList) => {
  return unitList.map((unit) => {
    return (
      <Option value={unit.name} key={unit.id}>{unit.name}</Option>
    )
  })
}
const ItemForm = ({
                    visible,
                    onCancel,
                    modalMode,
                    item,
                    treeData,
                    unitList,
                    updateItem,
                    createItem,
                    loading,
                    form: {
                      getFieldDecorator,
                      validateFields
                    }
                  }) => {
  const onOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        if(modalMode === 'add'){
          createItem(values)
        }else{
          updateItem(values)
        }
      }
    })
  }
  return (
    <Modal
      title={modalMode === 'add' ? '货品新增' : '货品修改'}
      visible={visible}
      onCancel={onCancel}
      width={800}
      style={{ top: 20 }}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form>
        {modalMode === 'add' ?
          <FormItem label="货品群组" {...formItemLayout}>
            {getFieldDecorator('itemGroupId')(
              <TreeSelect
                style={{ width: 250 }}
                treeData={treeData}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择货品"
              />
            )}
          </FormItem> :
          <div>
            <FormItem label="货品群组" {...formItemLayout}>
              {getFieldDecorator('itemGroupName')(
                <Input readOnly />
              )}
            </FormItem>
            {getFieldDecorator('itemId')(
              <Input type="hidden" />
            )}
            {getFieldDecorator('itemGroupId',{
              initialValue: `${item.itemGroupId||''}`
            })(
              <Input type="hidden" />
            )}
          </div>
        }
        <FormItem label="名称" {...formItemLayout}>
          {getFieldDecorator('name',{
            rules: [{ required: true, message: '请输入名称!' }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="单位" {...formItemLayout}>
          {getFieldDecorator('unit',{
            rules: [{ required: true, message: '请选择单位!' }]
          })(
            <Select showSearch>
              {getUnitOption(unitList)}
            </Select>
          )}
        </FormItem>
        <FormItem label="规格" {...formItemLayout}>
          {getFieldDecorator('norm')(
            <Input />
          )}
        </FormItem>
        <FormItem label="计量小数位数" {...formItemLayout}>
          {getFieldDecorator('decNo')(
            <InputNumber min={0} max={5}/>
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status')(
            <RadioGroup>
              <Radio value={1}>有效</Radio>
              <Radio value={0}>无效</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="图片" {...formItemLayout}>
          <div>
            {getFieldDecorator('image', {
              valuePropName: 'fileList'
            })(
              <Upload
                listType="picture-card"
              >
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传</div>
                </div>
              </Upload>
            )}
          </div>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  mapPropsToFields(props){
    return {
      itemGroupName: Form.createFormField({
        value: props.item.itemGroupName
      }),
      itemId: Form.createFormField({
        value: props.item.itemId
      }),
      name: Form.createFormField({
        value: props.item.name
      }),
      unit: Form.createFormField({
        value: props.item.unit
      }),
      norm: Form.createFormField({
        value: props.item.norm
      }),
      decNo: Form.createFormField({
        value: props.item.decNo
      }),
      status: Form.createFormField({
        value: props.item.status
      })
    }
  }
})(ItemForm);

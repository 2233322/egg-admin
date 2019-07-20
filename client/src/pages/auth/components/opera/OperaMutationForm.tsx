import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Modal, Form, Input, Switch, InputNumber, TreeSelect } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

interface OperaMutationFormProps extends FormComponentProps {
  modalVisible: boolean;
  operaData: number | OperaFormFieldsValue;
  operaMutation: (
    fieldsValue: OperaFormFieldsValue,
  ) => void;
  handleModalVisible: () => void;
}

export interface OperaFormFieldsValue {
  id: number;
  parentId: number;
  name: string;
  uri: string;
  isMenu: boolean;
  url: string;
  iconfont: string;
  describe: string;
  sort: number
}


const OperaMutationForm: React.FC<OperaMutationFormProps> = props => {
  const { modalVisible, operaData, operaList, operaMutation, handleModalVisible, form } = props;
  const isEdit:boolean = typeof operaData === "object" ? true : false;
  const operaRoot = [{
    title: 'Root',
    value: 0,
    key: '0',
  }]
  const AddRootOperaList = operaRoot.concat(operaList);
  const okHandle = () => {
    form.validateFields((err, fieldsValue: any) => {
      if (err) return;
      form.resetFields();
      // 如果是object 表示编辑 添加id
      isEdit ? fieldsValue.id = operaData.id : '';
      typeof operaData === "object" ? operaData.id : '';
      operaMutation(fieldsValue);
    })
  }
  return (
    <Modal
      destroyOnClose
      title="添加功能模块"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父模块">
        {form.getFieldDecorator('parentId', {
          initialValue: isEdit ? operaData.parentId : operaData,
          rules: [{
            required: true,
            message: '请选择父模块',
          }]
        })(<TreeSelect
          style={{ width: 295 }}
          treeData={AddRootOperaList}
          treeDefaultExpandAll={true}
        />)}
      </Form.Item>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模块名称">
        {form.getFieldDecorator('name', {
          initialValue: isEdit ? operaData.name : '',
          rules: [{ required: true, message: '请输入模块名称！' }],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限标识">
        {form.getFieldDecorator('uri', {
          initialValue: isEdit ? operaData.uri : '',
          rules: [{ required: true, message: '请输入权限标识！' }],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否是菜单">
        {form.getFieldDecorator('isMenu', {
          valuePropName: 'checked',
          initialValue: isEdit ? operaData.isMenu : false,
        })(<Switch checkedChildren="YES" unCheckedChildren="NO" />)}
      </Form.Item>
      {form.getFieldValue('isMenu') ? (
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单地址">
          {form.getFieldDecorator('url', {
            initialValue: isEdit ? operaData.url : '',
          })(<Input placeholder="请输入" />)}
        </Form.Item>) : ''}
      {form.getFieldValue('isMenu') ? (
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="iconfont">
          {form.getFieldDecorator('iconfont', {
            initialValue: isEdit ? operaData.iconfont : '',
          })(<Input placeholder="请输入" />)}
        </Form.Item>) : ''}
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('describe', {
          initialValue: isEdit ? operaData.describe : '',
        })(<Input placeholder="描述" />)}
      </Form.Item>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
        {form.getFieldDecorator('sort', {
          initialValue: isEdit ? operaData.sort : 0,
        })(<InputNumber min={0} />)}
      </Form.Item>
    </Modal>
  )
}

export default connect(({ menu }: ConnectState) => ({
  operaList: menu.operaList
}))(OperaMutationForm);

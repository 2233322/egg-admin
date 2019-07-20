import React, { Fragment, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card, Form, Divider, Popconfirm, Row, Col, Button } from "antd";
import { connect } from "dva";
import { FormComponentProps } from "antd/es/form";
import { ConnectState, ConnectProps } from "@/models/connect";
import StandardTable, { StandardTableColumnProps } from "@/components/StandardTable";
import OperaMutationForm, { OperaFormFieldsValue } from "../components/opera/OperaMutationForm";
import { MenuModelState } from "@/models/menu";

const Opera: React.FC<FormComponentProps & ConnectProps & MenuModelState> = props => {

  const { dispatch, form, operaList, loading } = props;

  const [mutationModalVisible, setmutationModalVisible] = useState(false);
  const [operaData, setOperaData] = useState();

  // 添加模块
  const operaMutation = (fields: OperaFormFieldsValue) => {
    if (dispatch) {
      dispatch({
        type: 'menu/mutationOpera',
        payload: fields,
      })
      setmutationModalVisible(false);
    }
  }

  // 删除模块
  const delConfirm = (id: number) => {
    if (dispatch) {
      dispatch({
        type: 'menu/deleteOpera',
        payload: {
          id
        }
      })
    }
  }

  // 打开编辑框
  // itemData number为新增
  const openForm = (itemData: number | Object) => {
    setOperaData(itemData);
    setmutationModalVisible(true);
  }

  //关闭编辑框
  const handleModalVisible = (flag?: boolean) => {
    setOperaData(0);
    setmutationModalVisible(!!flag)
  }

  const parentMutationMethods = {
    operaMutation,
    handleModalVisible
  }

  const columns: StandardTableColumnProps[] = [
    {
      title: '操作名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限标识',
      dataIndex: 'uri',
      key: 'uri',
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Fragment>
          <a onClick={() => openForm(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除改模块吗?"
            onConfirm={() => delConfirm(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => openForm(record.id)}>添加下级模块</a>
        </Fragment>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <div>
          <Row>
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="primary" icon="plus" onClick={()=>openForm(0)}>添加功能模块</Button>
            </Col>
          </Row>
          <StandardTable
            columns={columns}
            dataSource={operaList}
            loading={loading.global}
          />
        </div>
      </Card>
      <OperaMutationForm {...parentMutationMethods} operaData={operaData} modalVisible={mutationModalVisible} form={form} />
    </PageHeaderWrapper>
  );
}


export default connect(({ menu, loading }: ConnectState) => ({
  operaList: menu.operaList,
  loading: loading
}))(Form.create()(Opera));

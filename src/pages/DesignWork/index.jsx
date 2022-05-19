import React, { Fragment, Component } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { nanoid } from 'nanoid';
import { toJSONSchema } from 'mockjs';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



@connect(({ infowork, loading }) => ({
  infowork,
  loading: loading.models.infowork
}))
export default class DesignWork extends Component {
  render() {
    const DesignWorkForm = () => {
      const [form] = Form.useForm();

      const onFinish = (values) => {
        values.work_id = nanoid()

        const { dispatch } = this.props

        dispatch({
          type: 'infowork/fetch',
          payload: {
            values
          }
        }).then(() => {
          this.props.infowork.ok == 1 ? message.success('作业上传成功') : message.error('作业上传失败')
        })

        //console.log(values);
      };

      const onReset = () => {
        form.resetFields();
      };

      return (
        <Fragment>
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              name="work_title"
              label="作业题目"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="state" label="年级" rules={[
              {
                required: true,
              },
            ]}>
              <Select allowClear style={{ width: '20%' }}>
                <Option value="2017">2017</Option>
                <Option value="2018">2018</Option>
                <Option value="2019">2019</Option>
              </Select>
            </Form.Item>
            <Form.Item name="institute" label="学院" rules={[
              {
                required: true,
              },
            ]}>
              <Select allowClear style={{ width: '50%' }}>
                <Option value="计算机与网络空间安全">计算机与网络空间安全</Option>
                <Option value="媒体工程学院">媒体工程学院</Option>
              </Select>
            </Form.Item>
            <Form.Item name="studentClass" label="班级" rules={[
              {
                required: true,
              },
            ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="request_1"
              label="作业要求1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="answer_1"
              label="参考答案"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="standard"
              label="评分标准"
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
      );
    };
    return (
      <Fragment>
        <h1 style={{ height: 72, fontWeight: 700, margin: 20 }}>作业设计</h1>
        <DesignWorkForm />
      </Fragment>
    )
  }
}




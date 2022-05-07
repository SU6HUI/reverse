import react, { Fragment } from 'react'
import styles from './index.less'
import {
  Form,
  Select,
  Radio,
  Button,
  Input,
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};



const WorkMutual = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (

    <Fragment>
      <h1 style={{ height: 72, fontWeight: 700 }}>作业互评</h1>
      <div className={styles.v}></div>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ marginLeft: '51%' }}
      >
        <Form.Item label="作业题目">
          <span className="ant-form-text">自我介绍</span>
        </Form.Item>

        <Form.Item label="评分标准1">
          <span className="ant-form-text">语句流畅</span>
        </Form.Item>

        <Form.Item name="radio-group">
          <Radio.Group>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
            <Radio value="4">4</Radio>
            <Radio value="5">5</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="answer">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="评分标准2">
          <span className="ant-form-text">作业要求全部完成</span>
        </Form.Item>

        <Form.Item name="radio-group">
          <Radio.Group>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
            <Radio value="4">4</Radio>
            <Radio value="5">5</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="answer">
          <Input.TextArea />
        </Form.Item>





        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Fragment>
  );
};

export default WorkMutual
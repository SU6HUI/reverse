import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import { Fragment } from 'react';
import styles from './form.less'

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
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

const Addstudent = (props) => {

    const [form] = Form.useForm();
    const [close, setClose] = useState(false)



    const onFinish = (values) => {
        //console.log(values);
        props.getData(values)
        setClose(true)
    };




    return (
        <Fragment className={styles.stddiv}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} className={styles.stdform}>
                <Form.Item
                    name="studentNumber"
                    label="学号"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="studentName"
                    label="姓名"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sex"
                    label="性别"
                >
                    <Select
                        allowClear
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="state"
                    label="年级"
                >
                    <Select
                        allowClear
                    >
                        <Option value="2017">2017</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="IdCard"
                    label="身份证号"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="political"
                    label="政治面貌"
                >
                    <Select
                        allowClear
                    >
                        <Option value="正式党员">正式党员</Option>
                        <Option value="预备党员">预备党员</Option>
                        <Option value="共青团员">共青团员</Option>
                        <Option value="群众">群众</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="电话号码"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="institute"
                    label="学院专业"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="studentClass"
                    label="班级"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>




                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
                <Form.Item {...tailLayout}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClose={props.onClose(close)}>
                        确定
                    </Button>
                    <Button
                        htmlType="button"
                        onClick={() => setClose(true)}
                        onClose={props.onClose(close)}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Fragment >
    );
};

export default Addstudent;
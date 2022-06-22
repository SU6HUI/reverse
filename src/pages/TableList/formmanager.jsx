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

const Addmanager = (props) => {

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
                    name="managerNumber"
                    label="教工号"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="managerName"
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
                    name="institute"
                    label="学院"
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
                    name="school"
                    label="毕业学校"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="educational"
                    label="学历"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="entryTime"
                    label="入职时间"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="position"
                    label="职位"
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

export default Addmanager;
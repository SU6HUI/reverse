import React, { Component, Fragment } from 'react'
import { Button, Form, Input, Select, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './index.less'
import nanoid from 'nanoid'

export default class CommitWork extends Component {
    render() {
        return (
            <Fragment>
                <h1 className={styles.title}>作业提交</h1>
                <CommitForm></CommitForm>
            </Fragment>
        )
    }
}



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
        offset: 10,
        span: 16,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};

const CommitForm = () => {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log(values);
        values.homewordId = nanoid()

    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
                name="state"
                label="年级"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="institute"
                label="学院"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="major"
                label="专业"
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
                name="address"
                label="上传视频"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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
    );
};

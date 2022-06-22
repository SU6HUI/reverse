import React, { Component, Fragment } from 'react'
import { Button, Form, Input, Select, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './index.less'
import TcVod from 'vod-js-sdk-v6';

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
//https://juejin.cn/post/6844904202863378446



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
    };

    const onReset = () => {
        form.resetFields();
    };

    const httpRequest = (file) => {
        if (["video/mp4", "video/quicktime"].indexOf(file.file.type) == -1) {
            this.$message.error("视频格式有误，上传失败");
            return false;
        }
        // 限制视频小于700M
        const isLt10M = file.file.size / 1024 / 1024 < 700;
        if (!isLt10M) {
            this.$message.error("请上传MP4、MOV格式且不超过700MB的视频哦!");
            return false;
        }

        // 获取视频签名
        const getSignature = async function () {
            // return await getuploadsignature({  //这里就是发axios请求
            //     video_type: 'operating_activity'  // 参数是和后台定义的，不需要可以不写
            // }).then(res => {
            //     return res
            // })
        }

        // 前文中所述的获取上传签名的函数
        const tcVod = new TcVod({
            getSignature: getSignature
        })
        const uploader = tcVod.upload({
            mediaFile: file.file // 这里腾讯云需要获取到file文件里的name，根据你file结构进行填写
        })

        // 进度
        uploader.on('media_progress', function (info) {
            this.videoUploadPercent = parseInt(info.percent * 100);
        })

        // 上传成功
        uploader.done().then((doneResult) => {
            this.videoForm.Video = doneResult.fileId // 存储fileId
            // 这里发请求给后端进行转码操作
            const data = {
                file_id: doneResult.fileId, // 腾讯云file_id
                video_type: 'operating_activity', // 视频类型
                video_name: '', // 视频名称
                video_url: doneResult.video && doneResult.video.url ? doneResult.video.url : '',// 视频地址
            }
            // 腾讯视频转码
            videoProcedure(data)
                .then(res => {
                }).catch(err => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
    }








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
                name="class"
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
                <Upload name="logo" action="/upload.do" listType="picture" customRequest={httpRequest}>
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
}

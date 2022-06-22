import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { Form, Input, Button, Checkbox, Modal, message, Select } from 'antd';
import { updpassword, updpassword_teacher, updpassword_manager } from '@/services/user'

@connect(({ updpwd, loading }) => ({
  updpwd,
  loading: loading.models.updpwd,
}))
export default class ChangePassword extends Component {
  state = {
    showAlert: false,
  }


  formRef = React.createRef();

  render() {
    let info
    const onFinish = (values) => {
      info = values
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const onReset = () => {
      this.formRef.current.resetFields();
    };

    const handleCancel = () => {
      this.setState({
        showAlert: false
      })
    }

    const handleOk = async () => {
      let response
      if (info.type == 0) {
        info.studentName = info.name
        response = await updpassword(info)
      } else if (info.type == 1) {
        info.teacherName = info.name
        response = await updpassword_teacher(info)
      } else {
        info.managerName = info.name
        response = await updpassword_manager(info)
      }


      if (response.code == 200) {
        message.success('密码重置成功', 3)
        onReset()
      }
      else {
        message.error('密码重置失败，请检查身份证号和名字是否正确', 3)
        onReset()
      }


      this.setState({
        showAlert: false
      })

    }
    return (
      <Fragment>
        <h1 style={{ fontWeight: 700, margin: '20px' }}>修改密码</h1>
        <div className={styles.pwd}>
          <Form
            //name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{ width: '500px' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              label="身份证号"
              name="IdCard"
              rules={[
                {
                  required: true,
                  message: '请输入你的身份证号!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入你的姓名!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="身份"
              rules={[
                {
                  required: true,
                  message: '请输入身份!',
                },
              ]}
            >
              <Select
                allowClear
                style={{ width: 100 }}
              >
                <Option value="0">学生</Option>
                <Option value="1">教师</Option>
                <Option value="2">管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="新密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的新密码!',
                },
              ]}
            >
              <Input autocomplete='new-password' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => this.setState({
                  showAlert: true
                })}>
                重置
              </Button>
              <Modal
                title="Basic Modal"
                visible={this.state.showAlert}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>确定重置您的密码吗？</p>
              </Modal>
              <Button htmlType="button" onClick={onReset}>
                清空
              </Button>
            </Form.Item>
          </Form >
        </div>
      </Fragment >

    )
  }
}


import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { Form, Input, Button, Checkbox, Modal, message } from 'antd';


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
    const info = []
    const onFinish = (values) => {
      info.push(values)
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

    const handleOk = () => {

      const { dispatch } = this.props

      dispatch({
        type: 'updpwd/fetch',
        payload: {
          values: info
        }
      }).then(() => {
        if (this.props.updpwd.ok == 1) {
          message.success('密码重置成功', 3);
        } else if (this.props.updpwd.ok == 0) {
          message.error('密码重置失败，请检查身份证号和名字是否正确', 3)
        }
      })

      this.setState({
        showAlert: false
      })

      // setTimeout(() => {
      //   console.log(this.props);
      //   if (this.props.updpwd.ok == 1) {
      //     message.success('密码重置成功', 3);
      //   } else if (this.props.updpwd.ok == 0) {
      //     message.error('密码重置失败，请检查身份证号是否正确', 3)
      //   }
      // }, 500)


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
              name="studentName"
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
      </Fragment>

    )
  }
}


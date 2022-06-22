import {
  AlipayCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Button } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
// import { login } from '@/services/ant-design-pro/api';
import { loginUser } from '@/services/user'
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';


const Login = () => {
  const [peopleType, setpeopleType] = useState('-1') //0:学生
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    values.type = peopleType
    if (peopleType == -1) {
      message.error('请选择身份！');
    } else {
      if (peopleType == 0) values.studentNumber = values.username
      else if (peopleType == 1) values.teacherNumber = values.username
      else values.managerNumber = values.username
      try {
        // 登录
        const msg = await loginUser(values);
        if (msg.code === 200) {
          message.success('登录成功！');
          localStorage.setItem('token', msg.token)
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query;
          history.push(redirect || '/');
          return;
        }

        console.log(msg); // 如果失败去设置用户错误信息
        message.error('用户名或密码错误');
      } catch (error) {
        console.log(error);
        message.error('登录失败，请重试！');
      }
    }


  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}

          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {(
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div style={{ marginBottom: 10 }}>
            <Button ghost style={{ width: '33.3%' }} onClick={() => setpeopleType('0')}>学生</Button>
            <Button ghost style={{ width: '33.3%' }} onClick={() => setpeopleType('1')}>教师</Button>
            <Button ghost style={{ width: '33.3%' }} onClick={() => setpeopleType('2')}>管理员</Button>
          </div>
        </LoginForm>

      </div>
    </div>
  );
};

export default Login;

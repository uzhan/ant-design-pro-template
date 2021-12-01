import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Row, Col } from 'antd';
import React from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { login } from '@/services/login';
import styles from './index.less';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    // 登录
    const { data } = await login(values);
    const { NODE_ENV } = process.env;
    Cookies.set('token', data.token, {
      httpOnly: NODE_ENV === 'development' ? false : true,
      secure: NODE_ENV === 'development' ? false : true,
    });
    Cookies.set('userid', data.user_id);
    message.success('登录成功！');
    await fetchUserInfo();
    /** 此方法会跳转到 redirect 参数所在的位置 */
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  };

  return (
    <Row className={styles.login}>
      <Col className={styles.left} xxl={12} xl={12} lg={12} md={12} sm={0} xs={0}>
        <img title="后台管理系统" src="//assets.uphicoo.com/images/admin-template/login-left.png" />
      </Col>
      <Col className={styles.content} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <LoginForm
          // logo={<img alt="logo" src="//assets.uphicoo.com/images/admin-template/xcx-logo.png" />}
          title="后台管理系统"
          subTitle="后台管理系统描述"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="mobile"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入登录账号"
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="pwd"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入登录密码"
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </Col>
    </Row>
  );
};

export default Login;

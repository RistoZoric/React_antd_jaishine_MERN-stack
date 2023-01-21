import React from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Avatar,
  Divider,
  notification,
  Space
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login,initialMsg } from '../../actions/auth';
import config from '../../config/config';

const openNotification_error = (title, placement, msg) => {
  notification.error({
    message: title,
    description: msg,
    placement
  });
};

const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};

const Login = ({ login,initialMsg, auth: auth }) => {
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values);
  };
  React.useEffect(() => {
    if (auth.isAuthenticated == true) {
      navigate('/');
      if (auth.msg === config.login_success) {
        setError(auth.msg);
        openNotification_success('Success', 'topRight', auth.msg);
        initialMsg()
      }
    } else {
      if (auth.msg !== "") {
        setError(auth.msg);
        openNotification_error('Error', 'topRight', auth.msg);
        initialMsg()
      }
    }
  }, [auth]);
  return (
    <div
      className="loginform"
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 140,
        paddingBottom: 80
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 20
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          style={{ width: 400 }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <small style={{ color: 'red', textAlign: 'center' }}>{error}</small>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login,initialMsg })(Login);

import React from 'react';
import { Form, Input, Button, Checkbox, notification ,Divider } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HeatMapOutlined,
  ShoppingOutlined ,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { register,initialMsg } from '../../actions/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
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
const Register = ({ register,initialMsg, auth: auth }) => {
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const onFinish = (values) => {
    register(values);
  };

  React.useEffect(() => {
    if (auth.isAuthenticated == true) {
      navigate('/');
      if (auth.msg === config.register_success) {
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
          // className="login-form"
          style={{ width: 500 }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="country_name"
            rules={[
              {
                required: true,
                message: 'Please input your Country Name!'
              }
            ]}
          >
            <Input
              prefix={<HeatMapOutlined className="site-form-item-icon" />}
              placeholder="Country Name"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="telephone"
            rules={[
              {
                required: true,
                message: 'Please input your Phone number!'
              }
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Telephone"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
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
          <Form.Item
            name="pin"
            rules={[
              {
                required: true,
                message: 'Please input your Pincode!'
              }
            ]}
          >
            <Input
              prefix={<ShoppingOutlined  className="site-form-item-icon" />}
              type="text"
              placeholder="Pin"
            />
          </Form.Item>
          <Divider plain>Optional</Divider>
          <Form.Item
            name="position"
          >
            <Input
              type="text"
              placeholder="Position"
            />
          </Form.Item>
          <Form.Item
            name="ve"
          >
            <Input
              type="text"
              placeholder="Vat-id.NO"
            />
          </Form.Item>
          <Form.Item
            name="address"
          >
            <Input
              type="text"
              placeholder="Address Line"
            />
          </Form.Item>
          <Form.Item
            name="city"
          >
            <Input
              type="text"
              placeholder="City"
            />
          </Form.Item>
          <Form.Item
            name="region"
          >
            <Input
              type="text"
              placeholder="Region"
            />
          </Form.Item>
          <Form.Item
            name="postcode"
          >
            <Input
              type="number"
              placeholder="Postcode"
            />
          </Form.Item>
          <Form.Item
            name="company_name"
          >
            <Input
              type="text"
              placeholder="Company Name"
            />
          </Form.Item>
          <small style={{ color: 'red' }}>{error}</small>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register in
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register ,initialMsg})(Register);

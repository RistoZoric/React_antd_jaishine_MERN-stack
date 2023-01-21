import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { updateUser, initialMsg, getUserData } from '../../actions/auth';
import config from '../../config/config';
import jwt_decode from 'jwt-decode';

const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};

const Setting = ({
  updateUser,
  initialMsg,
  getUserData,
  auth: { user, msg, oneUser }
}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    _id: '',
    address: '',
    city: '',
    company_name: '',
    country_name: '',
    date: '',
    email: '',
    mobile: '',
    name: '',
    position: '',
    postcode: '',
    region: '',
    telephone: '',
    ve: '',
    role: ''
  });
  React.useEffect(() => {
    var userData = localStorage.getItem('user');
    if (userData) {
      userData = jwt_decode(userData);
      getUserData(userData._id);
    }
  }, []);
  React.useEffect(() => {
    if (oneUser._id) {
      const {
        _id,
        address,
        city,
        company_name,
        country_name,
        date,
        email,
        mobile,
        name,
        position,
        postcode,
        region,
        telephone,
        ve,
        role
      } = oneUser;

      setUserData({
        _id,
        address,
        city,
        company_name,
        country_name,
        date,
        email,
        mobile,
        name,
        position,
        postcode,
        region,
        telephone,
        ve,
        role
      });
    }
  }, [oneUser]);
  React.useEffect(() => {
    if (msg === config.update_success) {
      openNotification_success('success', 'topRight', config.update_success);
      initialMsg();
      navigate("/")
    }
  }, [msg]);
  const onchange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onFinish = (values) => {
    updateUser(values);
  };
  const onclick = () => {
    updateUser(userData);
  };
  return (
    <div className="container" style={{ paddingTop: 100 }}>
      <div className="col-lg-6">
        <h3 style={{ paddingBottom: 10 }}>My Account settings</h3>
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.name}
          addonBefore="Name: "
          name="name"
          placeholder="Name"
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.country_name && userData.country_name}
          placeholder="Country Name"
          name="country_name"
          addonBefore="Country Name: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.position && userData.position}
          placeholder="Position"
          name="position"
          addonBefore="Position Name: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.vat && userData.vat}
          name="vat"
          placeholder="VAT-id.No"
          addonBefore="VAT-id.No: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.address && userData.address}
          placeholder="Address line"
          name="address"
          addonBefore="Address line: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.city && userData.city}
          placeholder="City"
          name="city"
          addonBefore="City: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.region && userData.region}
          placeholder="Region"
          name="region"
          addonBefore="Region: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.postcode && userData.postcode}
          placeholder="Postcode"
          name="postcode"
          type="number"
          addonBefore="Postcode: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.company_name && userData.company_name}
          placeholder="Company Name"
          name="company_name"
          addonBefore="Company Name: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.telephone && userData.telephone}
          placeholder="Telephone"
          name="telephone"
          type="number"
          addonBefore="Telephone: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.mobile && userData.mobile}
          placeholder="Mobile"
          name="mobile"
          type="number"
          addonBefore="Mobile: "
        />
        <Input
          className="padding-input"
          onChange={(e) => onchange(e)}
          value={userData.email && userData.email}
          placeholder="Email"
          addonBefore="Email: "
          type="email"
          name="email"
        />
      </div>
      <div className="col-lg-6">
        <h3 style={{paddingBottom:10}}>E-mail Notification</h3>
          <Form.Item
            name="1"
          >
            <Checkbox>
              I agree that my data will be used for analysis purposes
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="2"
          >
            <Checkbox>Please send me email about new offers</Checkbox>
          </Form.Item>
          <Form.Item
            name="3"
          >
            <Checkbox>Food</Checkbox>
          </Form.Item>
          <Form.Item
            name="4"
          >
            <Checkbox>Electronics</Checkbox>
          </Form.Item>
          <Form.Item
            name="5"
          >
            <Checkbox>Textile</Checkbox>
          </Form.Item>
          <Form.Item
            name="6"
          >
            <Checkbox>Raw Ingredients</Checkbox>
          </Form.Item>
          <Form.Item
            name="7"
          >
            <Checkbox>Gift Items</Checkbox>
          </Form.Item>
          <Form.Item
            name="8"
          >
            <Checkbox>Spirits</Checkbox>
          </Form.Item>
          <Form.Item
            name="9"
          >
            <Checkbox>Solar</Checkbox>
          </Form.Item>
          <Form.Item
            name="10"
          >
            <Checkbox>Industrial machines</Checkbox>
          </Form.Item>
          <Form.Item
            name="11"
          >
            <Checkbox>Automobile</Checkbox>
          </Form.Item>
          <Form.Item
            name="12"
          >
            <Checkbox>Household</Checkbox>
          </Form.Item>
          <Form.Item
            name="13"
          >
            <Checkbox>Other stuff</Checkbox>
          </Form.Item>
      </div>
      <div className="col-lg-12">
        <Button
          type="primary"
          style={{ width: 200, marginTop: 20, marginBottom: 20 }}
          onClick={onclick}
          className="login-form-button"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  updateUser,
  initialMsg,
  getUserData
})(Setting);

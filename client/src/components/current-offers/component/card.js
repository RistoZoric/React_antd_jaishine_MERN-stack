import React from 'react';
import { Button, Modal, notification } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import api from '../../../utils/api';
import { deleteaction } from '../../../actions/category';
const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};

const Card = ({ data, auth, deleteaction }) => {
  const [admin, SetAdmin] = React.useState(false);
  const [status, setStatus] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  var navigate = useNavigate();

  const onclick = () => {
    navigate('view/' + data._id);
  };

  React.useEffect(() => {
    if (data.active === 1) {
      setStatus(1);
    } else if (data.active === 0) {
      setStatus(0);
    }
    var userData = localStorage.getItem('user');

    if (userData) {
      userData = jwt_decode(userData);
      if (userData.role === 1) {
        SetAdmin(true);
      } else if (userData.role == 0) {
        SetAdmin(false);
      }
    }
  }, [auth]);

  const active = async (id, e) => {
    try {
      const res = await api.post('/category/active', { id, e });
      setStatus(e);
    } catch (err) {}
    // setStatus(e)
  };

  const edit = () => {
    navigate('edit/' + data._id);
  };

  const deletefn = (id) => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    deleteaction(data._id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 card_border">
      <div className="float_right">
        {admin ? (
          <div className="admin_control">
            {status === 1 ? (
              <Button
                type="primary"
                size="small"
                onClick={() => active(data._id, 0)}
              >
                <CheckOutlined />
              </Button>
            ) : (
              <Button
                type="danger"
                size="small"
                onClick={() => active(data._id, 1)}
              >
                <CloseOutlined />
              </Button>
            )}

            <Button type="primary" size="small" onClick={edit}>
              <FormOutlined />
            </Button>
            <Button
              type="danger"
              size="small"
              onClick={() => deletefn(data._id)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="col-md-12">
        <h4>{data.track}</h4>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="col-sm-6">
            <p>Status: {data.status}</p>
            <p>Location: {data.location}</p>
            <p>Condition: {data.condition}</p>
          </div>
          <div className="col-sm-6">
            <p>Price: {data.price}</p>
            <p>Quantity: {data.material}</p>
            <p>Restriction: {data.restriction}</p>
          </div>
          <div className="col-sm-12" style={{ height: 41, overflow: 'hidden' }}>
            {data.info}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card_image">
            {data.image !== '' &&
              JSON.parse(data.image).map((value, index) => (
                <img src={value.url} style={{ height: 130 }} alt="image1" />
              ))}
          </div>
        </div>
      </div>
      <div className="detail_pos" style={{ paddingTop: 5, paddingLeft: 13 }}>
        <Button type="primary" onClick={onclick}>
          Detail
        </Button>
        <div>ID: {data._id}</div>
      </div>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to delete?</p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteaction })(Card);

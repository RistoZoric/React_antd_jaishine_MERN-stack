import React from 'react';
import { getUser, deleteUser, initialMsg,activeUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Table, Modal, notification } from 'antd';
import { EyeOutlined, DeleteOutlined ,CheckOutlined,CloseOutlined} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import config from '../../config/config';
import api from '../../utils/api';

const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};

const User = ({ getUser, deleteUser,activeUser, initialMsg, auth }) => {
  const [rows, setRows] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [seletedRecord, setSeletedRecord] = React.useState({});
  const [status, setStatus] = React.useState(1);
  const navigate = useNavigate();
  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    auth.allUser.map((value, index) => {
      value.no = index + 1;
    });
    setRows(auth.allUser);
    if (auth.msg === config.del_success) {
      openNotification_success('Success', 'topRight', auth.msg);
      initialMsg();
    }
  }, [auth.allUser]);
  function delete_fn(record) {
    setIsModalOpen(true);
    setSeletedRecord(record);
  }
  function view_fn(record) {
    navigate('view/' + record._id);
  }
  const handleOk = () => {
    setIsModalOpen(false);
    deleteUser(seletedRecord._id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const active = async (id, e) => {
    activeUser(id,e)
  };

  const columns = [
    {
      title: 'NO',
      width: 30,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left'
    },
    {
      title: 'Company Name',
      width: 80,
      dataIndex: 'country_name',
      key: 'country_name'
    },
    {
      title: 'Full Name',
      width: 80,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Telephone',
      width: 80,
      dataIndex: 'telephone',
      key: 'telephone'
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      width: 80
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 80
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 60,
      render: (record) => (
        <>
          <span >
            <EyeOutlined className="pointer" onClick={() => view_fn(record)} />
          </span>
          <span>
            <DeleteOutlined
              className="pointer"
              style={{ paddingRight: 20,paddingLeft:20 }}
              onClick={() => delete_fn(record)}
            />
          </span>
          {record.active === 1 ? (
            <CheckOutlined  className="pointer" onClick={() => active(record._id, 0)} />
          ) : (
            <CloseOutlined  className="pointer" onClick={() => active(record._id, 1)} />
          )}
        </>
      )
    }
  ];
  return (
    <div style={{ paddingTop: 100 }} className="container">
      <h3>Registered User</h3>
      <Table columns={columns} dataSource={rows} />
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete?</p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getUser, deleteUser, initialMsg ,activeUser})(
  User
);

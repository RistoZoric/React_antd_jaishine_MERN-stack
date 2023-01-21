import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { getUserData } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const View = ({ getUserData, auth: { oneUser } }) => {
  const [userData, setUserData] = React.useState({});

  let { id } = useParams();

  React.useEffect(() => {
    getUserData(id);
  }, []);

  React.useEffect(() => {
    setUserData(oneUser);
  }, [oneUser]);

  return (
    <div
      className="container"
      id="view"
      style={{ paddingTop: 150, paddingBottom: 100 }}
    >
      <h2 className='text-center'>Information of <span style={{color:'red'}}>{userData.name}</span></h2>
      <p>
        Country Name: <span>{userData.country_name}</span>
      </p>
      <p>
        Email: <span>{userData.email}</span>
      </p>
      <p>
        Phone Number: <span>{userData.telephone}</span>
      </p>
      <p>
        Date: <span>{userData.date}</span>
      </p>
      <div className="center_position">
        <Link to="/user" style={{ marginTop: 30 }}>
          <Button type="primary">Back</Button>
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getUserData })(View);

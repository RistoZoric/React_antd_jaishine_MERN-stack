import React from 'react';
import { connect } from 'react-redux';
import Card from './component/card';
import { getCategory, getOffer, initialMsg } from '../../actions/category';
import {
  Checkbox,
  Pagination,
  Divider,
  Button,
  notification,
  Empty
} from 'antd';
import { FormOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};
const CurrentOffers = ({ getCategory, getOffer, initialMsg, cate: cate }) => {
  const [countrycategory, setCoutrycategory] = React.useState([]);
  const [subCategory, setSubcategory] = React.useState([]);
  const [current, setCurrent] = React.useState(1);
  const [country_query, setCountry_query] = React.useState([]);
  const [sub_category, setSub_category] = React.useState([]);
  const [page, setPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [role, setRole] = React.useState(0);

  React.useEffect(() => {
    var userData = localStorage.getItem('user');
    userData = jwt_decode(userData);
    getOffer([], [], page, 1, 1, userData.role);

    setRole(userData.role);
    getCategory();
  }, []);

  React.useEffect(() => {
    setCoutrycategory(cate.country_category);
    setSubcategory(cate.sub_category);
    if (cate.offerdata != null) {
      setCurrent(cate.offerdata.current);
      setTotal(cate.offerdata.total);
      setData(cate.offerdata.data);
    }
    if (cate.msg !== '') {
      openNotification_success('Success', 'topRight', cate.msg);
      getOffer(country_query, sub_category, page, current, 1, role);
      initialMsg();
    }
  }, [cate]);

  const onChange = (e, value, title) => {
    if (value === 'country') {
      if (e.target.checked === true) {
        country_query.push(title);
        getOffer(country_query, sub_category, page, current, 1, role);
        setCountry_query(country_query);
      } else {
        var country1 = [];
        country_query.map((value) => {
          if (value !== title) {
            country1.push(value);
          }
        });
        getOffer(country1, sub_category, page, current, 1, role);
        setCountry_query(country1);
      }
    } else {
      if (e.target.checked === true) {
        sub_category.push(title);
        getOffer(country_query, sub_category, page, current, 1, role);
        setSub_category(sub_category);
      } else {
        var sub1 = [];
        sub_category.map((value) => {
          if (value !== title) {
            sub1.push(value);
          }
        });
        getOffer(country_query, sub1, page, current, 1, role);
        setSub_category(sub1);
      }
    }
  };

  const changefn = (current, size) => {
    if (current === 0) {
      current = 1;
    }
    getOffer(country_query, sub_category, size, current, 1, role);
    setPage(size);
  };
  return (
    <div className="container" style={{ paddingTop: 100 }}>
      <div className="col-lg-4">
        <h4>Coutries</h4>
        {countrycategory.map((value, index) => (
          <>
            <Checkbox
              name="country"
              onChange={(e) => onChange(e, 'country', value.title)}
            >
              {value.title}
            </Checkbox>
            <br />
          </>
        ))}
        <Divider />
        <h4 stype={{ paddingTop: 10 }}>Its Category</h4>
        {subCategory.map((value, index) => (
          <>
            <Checkbox
              name="sub"
              onChange={(e) => onChange(e, 'sub_cate', value.title)}
            >
              {value.title}
            </Checkbox>
            <br />
          </>
        ))}
      </div>
      <div className="col-lg-8">
        {data.length === 0 ? (
          <Empty style={{paddingTop:100,paddingBottom:50}}/>
        ) : (
          <>
            {data.map((value, index) => (
              <Card data={value} key={index} />
            ))}
          </>
        )}

        <Pagination
          style={{ paddingBottom: 20 }}
          onChange={changefn}
          defaultCurrent={current}
          total={total}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cate: state.category
});

export default connect(mapStateToProps, { getCategory, getOffer, initialMsg })(
  CurrentOffers
);

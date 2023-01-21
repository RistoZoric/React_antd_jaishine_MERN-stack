import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { getOneOffer } from '../../../actions/category';
import { Button, Modal, InputNumber } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { DownloadOutlined } from '@ant-design/icons';
import JsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const DetailedCard = ({ getOneOffer, cate: cate }) => {
  const [data, setData] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  const navigate = useNavigate();
  let { id } = useParams();
  const componentRef = useRef();
  React.useEffect(() => {
    getOneOffer(id);
  }, []);
  React.useEffect(() => {
    setData(cate.oneofferdata);
  }, [cate]);

  const backClick = () => {
    navigate(-1);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const generatePDF = () => {
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    var source = document.querySelector('#content');
    source.querySelector('#amount').innerHTML = amount;
    source.querySelector('#mark').innerHTML = 'Naluny Pdf';
    const report = new JsPDF('l', 'pt', [
      document.querySelector('#content').clientWidth,
      document.querySelector('#content').clientHeight + 30
    ]);
    report.html(source).then(() => {
      report.save(data.track);
      var source1 = document.querySelector('#content');
      source1.querySelector('#amount').innerHTML = data.amount;
      source.querySelector('#mark').innerHTML = '';
    });

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    setAmount(e);
  };
  const download = (url, name) => {
    saveAs(url, name);
  };
  return (
    <div className="container" style={{ paddingTop: 100 }}>
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: 10
        }}
      >
        <Button type="primary" onClick={generatePDF}>
          <DownloadOutlined />
        </Button>
      </div>
      <div className="row" id="content" style={{ paddingBottom: 20 }}>
        <div className="col-lg-5 p4">
          <div className="col-md-12">
            {data.image && data.image !== '[]' ? (
              <a
              className='image'
                onClick={() =>
                  download(
                    JSON.parse(data.image)[0].url,
                    JSON.parse(data.image)[0].name
                  )
                }
              >
                <img
                  src={
                    data.image &&
                    data.image !== '[]' &&
                    JSON.parse(data.image)[0].url
                  }
                  style={{ width: '100%' }}
                />
              </a>
            ) : (
              <></>
            )}
          </div>
          {data.image &&
            data.image !== '[]' &&
            JSON.parse(data.image).map((value, index) => (
              <div className="col-md-4 col-sm-6">
                <a onClick={() => download(value.url, value.name)} className='image'>
                  <img src={value.url} style={{ width: '100%', padding: 5 }} />
                </a>
              </div>
            ))}
        </div>
        <div className="col-lg-7 p4">
          <h3>{data.track}</h3>
          <div className="col-md-6">
            <p>Status: {data.status}</p>
            <p>Location: {data.location}</p>
            <p>Partial sale: {data.sale}</p>
            <p>Price: {data.price}</p>
            <div>
              <p>Document</p>
              {data.file &&
                data.file !== [] &&
                JSON.parse(data.file).map((value, index) => (
                  <a href={value.url}>{value.name}</a>
                ))}
            </div>
          </div>
          <div className="col-md-6">
            <p>Restrictions: {data.restriction}</p>
            <p>
              Amount: <span id="amount">{data.amount}</span>
            </p>
            <p>VE: {data.ve}</p>
            <p>Color: {data.color}</p>
            <p>EAN Category: {data.ean}</p>
            <p>Material: {data.material}</p>
            <p>Size: {data.size}</p>
          </div>
          <div className="col-md-12 ">
            <h5>Detailed Information</h5>
            <div className="detailedBorder">{data.info}</div>
            <h5
              style={{ textAlign: 'end', paddingTop: 30, fontWeight: 600 }}
              id="mark"
            ></h5>
          </div>
        </div>
      </div>

      <div
        className="center_position"
        style={{ paddingTop: 30, paddingBottom: 30 }}
      >
        <Button type="primary" onClick={backClick}>
          Back
        </Button>
      </div>
      <Modal
        title="Please enter the Amount?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="pos_center">
          <InputNumber
            min={1}
            style={{ width: 300 }}
            max={100000}
            defaultValue={1}
            onChange={onChange}
          />
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cate: state.category
});

export default connect(mapStateToProps, { getOneOffer })(DetailedCard);

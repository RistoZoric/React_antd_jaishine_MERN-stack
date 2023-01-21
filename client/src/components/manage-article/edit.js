import React, { useRef } from 'react';
import {
  Col,
  Row,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Upload,
  Divider,
  Select,
  notification
} from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  getCategory,
  createOffer,
  initialMsg,
  getOneOffer,
  updateOffer
} from '../../actions/category';
import { connect } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const openNotification_success = (title, placement, msg) => {
  notification.success({
    message: title,
    description: msg,
    placement
  });
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const { TextArea } = Input;

const ManageArticle = ({
  getCategory,
  initialMsg,
  getOneOffer,
  createOffer,
  updateOffer,
  cate: cate
}) => {
  const [countrycategory, setCoutrycategory] = React.useState([]);
  const [subCategory, setSubcategory] = React.useState([]);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const [fileList, setFileList] = React.useState([]);
  const [fileList1, setFileList1] = React.useState([]);
  const [isLoad, setIsload] = React.useState(false);
  const [defaultvalue, setDefault] = React.useState(null);
  const [initialdata, setInitialData] = React.useState({
    amount: '',
    color: '',
    country: '',
    ean: '',
    info: '',
    location: '',
    material: '',
    price: '',
    restriction: '',
    sale: '',
    size: '',
    status: '',
    sub_category: '',
    track: ''
  });
  let { id } = useParams();

  const navigate = useNavigate();

  var props = {
    action: '/api/category/file_upload',

    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        setFileList1(fileList);
      }
    },

    // defaultFileList: []
  };

  React.useEffect(() => {
    getCategory();
    getOneOffer(id);
  }, []);
  React.useEffect(() => {
    if (cate.oneofferdata.file && cate.oneofferdata.image) {
      var sub_cate = [];
      JSON.parse(cate.oneofferdata.file).map((value, index) => {
        sub_cate.push({ ...value, uid: index, status: 'done' });
      });
      setDefault(sub_cate)
      // console.log(sub_cate,"this is subcate")
      // props={...props,defaultFileList: sub_cate};
      // console.log(props, sub_cate, 'thi si sub_cate');
      // setIsload(true);
      setFileList(JSON.parse(cate.oneofferdata.image));
      const {
        amount,
        color,
        country,
        ean,
        info,
        location,
        material,
        price,
        restriction,
        sale,
        size,
        ve,
        status,
        sub_category,
        track
      } = cate.oneofferdata;
      console.log(track);
      setInitialData({
        amount,
        color,
        country,
        ean,
        info,
        location,
        material,
        price,
        restriction,
        sale,
        ve,
        size,
        status,
        sub_category,
        track
      });
    }
    setCoutrycategory(cate.country_category);

    setSubcategory(cate.sub_category);

    if (cate.msg !== '') {
      openNotification_success('Success', 'topRight', cate.msg);
      initialMsg();
      navigate('/current-offers');
    }
  }, [cate]);

  const onFinish = (values) => {
    var filearray = [];
    fileList1.map((value, index) => {
      if(value.response){
        filearray.push(value.response);
      }else{
        filearray.push(value)
      }
    });
    var imagearray = [];
    fileList.map((value, index) => {
      if(value.response){
        imagearray.push(value.response);
      }else{
        imagearray.push(value)
      }
    });
    var file = JSON.stringify(filearray);
    var image = JSON.stringify(imagearray);
    updateOffer({ ...values, id, file: file, image: image });
  };

  const onFinishFailed = (errorInfo) => {};

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const save_fn = () => {};
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 100 }} className="container">
      <div className="row">
        <div className="col-lg-6">
          <h3>Edit articles</h3>
          {initialdata.track !== '' ? (
            <Form
              style={{ padding: 20 }}
              name="basic"
              labelCol={{
                span: 8
              }}
              wrapperCol={{
                span: 16
              }}
              initialValues={{
                remember: true,
                ...initialdata
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: 'Please select coutry!'
                  }
                ]}
              >
                <Select>
                  {countrycategory.map((value, index) => (
                    <Option value={value.title}>{value.title}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Its Category"
                name="sub_category"
                rules={[
                  {
                    required: true,
                    message: 'Please select Category!'
                  }
                ]}
              >
                <Select>
                  {subCategory.map((value, index) => (
                    <Option value={value.title}>{value.title}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Track"
                name="track"
                rules={[
                  {
                    required: true,
                    message: 'Please input track!'
                  }
                ]}
              >
                <Input value="af" />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: 'Please input location!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: 'Please input Status!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Partial dale"
                name="sale"
                rules={[
                  {
                    required: true,
                    message: 'Please input Partial sale!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input price!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Restriction"
                name="restriction"
                rules={[
                  {
                    required: true,
                    message: 'Please input restriction!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input amount!'
                  }
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="VE"
                name="ve"
                rules={[
                  {
                    required: true,
                    message: 'Please input VE!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Color"
                name="color"
                rules={[
                  {
                    required: true,
                    message: 'Please input color!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="EAN category"
                name="ean"
                rules={[
                  {
                    required: true,
                    message: 'Please input EAN category!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Material"
                name="material"
                rules={[
                  {
                    required: true,
                    message: 'Please input Material!'
                  }
                ]}
              >
                <Input />
              </Form.Item>{' '}
              <Form.Item
                label="Varying sizes"
                name="size"
                rules={[
                  {
                    required: true,
                    message: 'Please input Varying sizes!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Detailed information"
                name="info"
                rules={[
                  {
                    required: true,
                    message: 'Please input Detailed information!'
                  }
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item className="center_position">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 200 }}
                  className="login-form-button"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <></>
          )}
        </div>
        <div className="col-lg-6">
          <Divider />
          <h3>Document Upload</h3>
          {defaultvalue !==null ? (
            <Upload {...props} defaultFileList={defaultvalue}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          ) : (
            <></>
          )}

          <Divider />
          <h3>Image Upload</h3>
          <Upload
            action="/api/category/image_upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 15 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: '100%'
              }}
              src={previewImage}
            />
          </Modal>
        </div>
      </div>
      {/* <div className='center_position'>
        <Button type="primary" htmlType="submit" className="" onClick={save_fn} style={{width:150}}>
          Save
        </Button>
      </div> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  cate: state.category
});

export default connect(mapStateToProps, {
  getCategory,
  createOffer,
  initialMsg,
  getOneOffer,
  updateOffer
})(ManageArticle);

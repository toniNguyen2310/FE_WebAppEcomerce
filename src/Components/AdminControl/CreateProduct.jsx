import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { callCreateProduct } from "../../services.js/api";
import { dataBrand, dataCategory } from "../../utils/constant";


function CreateProduct(props) {
  const { setOpenModalCreate, openModalCreate, fetchProduct } = props;
  const [form] = Form.useForm();
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  const handleCreateProduct = async (values) => {
    const data = {
      name: values.name.trim().toUpperCase(),
      description: values.description.trim(),
      price: values.price.trim(),
      discount: values.discount.trim(),
      brand: values.brand.trim(),
      category: values.category.trim(),
      inventory: values.inventory.trim(),
      images: [
        values.image1.trim(),
        values.image2.trim(),
        values.image3.trim(),
      ],
    };
    const res = await callCreateProduct(data);
    if (res && res.data) {
      toast.success("Tạo sản phẩm thành công");
      fetchProduct();
    } else {
      toast.error("Có lỗi xảy ra, hãy thử lại");
      return;
    }
    form.resetFields();
    setImg1("");
    setImg2("");
    setImg3("");
    setOpenModalCreate(false);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Drawer
        title="Tạo sản phẩm mới"
        width={720}
        onClose={() => setOpenModalCreate(false)}
        open={openModalCreate}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={() => setOpenModalCreate(false)}>Cancel</Button>
            <Button form="myForm" key="submit" htmlType="submit" type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          id="myForm"
          layout="vertical"
          onFinish={handleCreateProduct}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select category",
                  },
                ]}
              >
                <Select
                  name="category"
                  initialvalues="Category"
                  style={{
                    width: 200,
                  }}
                  // onChange={(value) => setCategory(value)}
                  options={dataCategory.map((category) => {
                    return {
                      value: category.value,
                      label: category.label,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[
                  {
                    required: true,
                    message: "Please select brand",
                  },
                ]}
              >
                <Select
                  name="brand"
                  initialvalues="Brand"
                  style={{
                    width: 200,
                  }}
                  options={dataBrand.map((brand) => {
                    return {
                      value: brand.value,
                      label: brand.value,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[
                  {
                    required: true,
                    message: "Please enter price",
                  },
                ]}
              >
                <Input type="number" placeholder="Please enter price" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="discount"
                label="Discount"
                rules={[
                  {
                    required: true,
                    message: "Please enter discount",
                  },
                ]}
              >
                <Input type="number" placeholder="Please enter discount" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="inventory"
                label="Tồn kho"
                rules={[
                  {
                    required: true,
                    message: "Please enter inventory",
                  },
                ]}
              >
                <Input type="number" placeholder="Please enter inventory" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="image1"
                label="Ảnh 1"
                rules={[
                  {
                    required: true,
                    message: "Please enter url image",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setImg1(e.target.value)}
                  placeholder="Please enter url image"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="image2"
                label="Ảnh 2"
                rules={[
                  {
                    required: true,
                    message: "Please enter url image",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setImg2(e.target.value)}
                  placeholder="Please enter url image"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="image3"
                label="Ảnh 3"
                rules={[
                  {
                    required: true,
                    message: "Please enter url image",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setImg3(e.target.value)}
                  placeholder="Please enter url image"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Image width={200} src={img1} />
            </Col>
            <Col span={8}>
              <Image width={200} src={img2} />
            </Col>
            <Col span={8}>
              <Image width={200} src={img3} />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default CreateProduct;

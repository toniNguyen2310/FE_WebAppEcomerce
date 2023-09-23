import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Image,
  Select,
} from "antd";
import { dataBrand, dataCategory } from "../ManagerProducts";
import { toast } from "react-toastify";
import { putProduct } from "../../../services.js/api";

function CheckAndEditProduct(props) {
  const {
    isEdit,
    setIsEdit,
    setOpenModalDeleteAndEdit,
    openModalDeleteAndEdit,
    product,
    fetchProduct,
  } = props;
  console.log(isEdit);
  const [form] = Form.useForm();
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fillData = () => {
    if (!product) {
      return;
    }
    form.setFieldsValue({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      discount: product.discount,
      inventory: product.inventory,
      description: product.description,
      image1: product.images[0],
      image2: product.images[1],
      image3: product.images[2],
    });
    setImg1(product?.images[0]);
    setImg2(product?.images[1]);
    setImg3(product?.images[2]);
  };

  const handleUpdateProduct = async (values) => {
    const data = {
      _id: product._id,
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
    const res = await putProduct(data);
    if (res && res.data) {
      console.log("res>>> ", res.data);
      toast.success("Cập nhật sản phẩm thành công");
      fetchProduct();
    } else {
      toast.error("Có lỗi xảy ra, hãy thử lại");
      return;
    }

    form.resetFields();
    setImg1("");
    setImg2("");
    setImg3("");
    setOpenModalDeleteAndEdit(false);
  };

  const closeModal = () => {
    setOpenModalDeleteAndEdit(false);
    setIsEdit(false);
  };

  useEffect(() => {
    fillData();
  }, [product]);
  return (
    <>
      <Drawer
        getContainer={false}
        title={isEdit ? "CẬP NHẬT SẢN PHẨM" : "XEM CHI TIẾT SẢN PHẨM"}
        width={900}
        onClose={closeModal}
        open={openModalDeleteAndEdit}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={closeModal}>HỦY</Button>
            <Button
              style={{ display: isEdit ? "block" : "none" }}
              form="myFormEdit"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              CẬP NHẬT
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          id="myFormEdit"
          layout="vertical"
          onFinish={handleUpdateProduct}
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
                <Input
                  disabled={isEdit ? false : true}
                  placeholder="Please enter user name"
                />
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
                  disabled={isEdit ? false : true}
                  name="category"
                  initialvalues="Category"
                  style={{
                    width: 250,
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
                  disabled={isEdit ? false : true}
                  name="brand"
                  initialvalues="Brand"
                  // defaultValue="All"
                  style={{
                    width: 250,
                  }}
                  // onChange={(value) => setBrand(value)}
                  options={dataBrand.map((brand) => {
                    return {
                      value: brand,
                      label: brand,
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
                <Input
                  disabled={isEdit ? false : true}
                  type="number"
                  placeholder="Please enter price"
                />
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
                <Input
                  disabled={isEdit ? false : true}
                  type="number"
                  placeholder="Please enter discount"
                />
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
                <Input
                  disabled={isEdit ? false : true}
                  type="number"
                  placeholder="Please enter inventory"
                />
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
                  disabled={isEdit ? false : true}
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
                  disabled={isEdit ? false : true}
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
                  disabled={isEdit ? false : true}
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
                  disabled={isEdit ? false : true}
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

export default CheckAndEditProduct;

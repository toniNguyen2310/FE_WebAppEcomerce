import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  callDeleteProduct,
  getProductById,
  getProducts,
} from "../../services.js/api";
import SelectCategory from "../SelectCategoryAndBrand";
import CreateProduct from "./CreateProduct";
import CheckAndEditProduct from "./CheckAndEditProduct";

const columsSearch = [
  {
    title: "Category",
    dataIndex: "Category",
    key: "category",
  },
  {
    title: "Brand",
    dataIndex: "Brand",
    key: "brand",
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
  },
];

export const dataCategory = [
  { value: "All", label: "All" },
  { value: "lot-chuot", label: "LÓT CHUỘT" },
  { value: "chuot-gaming", label: "CHUỘT GAMING" },
  { value: "ban-phim-gaming", label: "BÀN PHÍM GAMING" },
  { value: "tai-nghe", label: "TAI NGHE" },
  { value: "tay-cam-gaming", label: "TAY CẦM GAMING" },
  { value: "loa", label: "LOA" },
  { value: "mo-hinh", label: "MÔ HÌNH" },
  { value: "phu-kien", label: "PHỤ KIỆN" },
  { value: "ghe-gaming", label: "GHẾ GAMING" },
  { value: "ban-gaming", label: "BÀN GAMING" },
];

export const dataBrand = [
  { value: "All", label: "All" },
  { value: "boshan", label: "BOSHAN" },
  { value: "dareu", label: "DAREU" },
  { value: "cidoo", label: "CIDOO" },
  { value: "akko", label: "AKKO" },
  { value: "cong-thai-hoc", label: "CÔNG THÁI HỌC" },
  { value: "lac-dau", label: "LẮC ĐẦU" },
  { value: "e-dra", label: "E-DRA" },
  { value: "led", label: "LED" },
  { value: "logitech", label: "LOGITECH" },
  { value: "havit", label: "HAVIT" },
  { value: "playstation", label: "PLAYSTATION" },
  { value: "sada", label: "SADA" },
  { value: "marvel", label: "MARVEL" },
  { value: "tranformer", label: "TRANFORMER" },
  { value: "khac", label: "KHÁC" },
  { value: "warrior", label: "WARRIOR" },
  { value: "viking", label: "VIKING" },
];

export const dataPrice = [
  { value: "op01", label: "Dưới 100 ngàn" },
  { value: "op12", label: "100 - 200 ngàn" },
  { value: "op25", label: "200 - 500 ngàn" },
  { value: "op50", label: "Trên 500 ngàn" },
];

function ManagerProducts(props) {
  const [listProduct, setListProduct] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [product, setProduct] = useState();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDeleteAndEdit, setOpenModalDeleteAndEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  //Search // filter // patination
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchName, setSearchName] = useState("");

  //list search antd category/brand/name
  let listInputSearch = [
    {
      Category: (
        <SelectCategory
          dataCategory={dataCategory}
          setSearchCategory={setSearchCategory}
        />
      ),
      Brand: (
        <SelectCategory dataBrand={dataBrand} setSearchBrand={setSearchBrand} />
      ),
      Name: (
        <Input
          placeholder="Search brands"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      ),
    },
  ];

  //colums table
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Giá KM",
      dataIndex: "priceAfter",
      key: "priceAfter",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EyeOutlined onClick={() => handleGetProductById(record._id)} />
          </a>
          <a>
            <EditOutlined onClick={() => openModalEdit(record._id)} />
          </a>
          <a>
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn vẫn muốn xóa SP chứ?"
              onConfirm={() => deleteProduct(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </a>
        </Space>
      ),
    },
  ];

  //OPEN   EDIT
  const openModalEdit = (id) => {
    handleGetProductById(id);
    setIsEdit(true);
  };

  //HANDLE GET PRODUCT BY ID
  const handleGetProductById = async (id) => {
    const res = await getProductById(id);
    console.log(id);
    if (res && res.data) {
      setProduct(res.data);
    }
    setOpenModalDeleteAndEdit(true);
  };

  //Onchange pagination of table products
  const handleOnChangeTable = (pagination) => {
    console.log("pagination>>> ", pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize != pageSize) {
      console.log("onchange2");
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  //FETCH PRODUCTS
  const fetchProduct = async () => {
    const query = `current=${current}&pageSize=${pageSize}&name=${searchName}&category=${searchCategory}&brand=${searchBrand}`;
    const res = await getProducts(query);
    if (res && res.data) {
      setListProduct(res.data.products);
      setTotal(res.data.count);
    }
  };

  //HANDLE DELETE PRODUCT
  const deleteProduct = async (userId) => {
    const res = await callDeleteProduct(userId);
    if (res && res.data) {
      toast.success("Xóa thành công");
      fetchProduct();
      if ((total - 1) % 5 === 0) {
        setCurrent(current - 1);
        console.log("done");
      }
    } else {
      toast.error("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [current, pageSize, searchCategory, searchBrand, searchName]);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <CreateProduct
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchProduct={fetchProduct}
      />
      <CheckAndEditProduct
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        product={product}
        openModalDeleteAndEdit={openModalDeleteAndEdit}
        setOpenModalDeleteAndEdit={setOpenModalDeleteAndEdit}
        fetchProduct={fetchProduct}
      />
      <Table
        columns={columsSearch}
        dataSource={listInputSearch}
        pagination={false}
        rowKey={(record) => record.Name}
      />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Table products ({total} SP)</h1>

          <Button
            type="primary"
            onClick={() => setOpenModalCreate(true)}
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
        <Table
          style={{
            width: "100%",
          }}
          bordered
          columns={columns}
          dataSource={listProduct}
          rowKey={(record) => record._id}
          onChange={handleOnChangeTable}
          pagination={{
            position: ["none", "bottomCenter"],
            showSizeChanger: false,
            pageSize: pageSize,
            current: current,
            total: total,
          }}
        />
      </div>
    </div>
  );
}

export default ManagerProducts;

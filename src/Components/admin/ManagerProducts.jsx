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
import { callDeleteProduct, getProducts } from "../../services.js/api";
import SelectCategory from "../SelectCategoryAndBrand";
import CreateProduct from "./modal/CreateProduct";

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
  { value: "bàn-phím-gaming", label: "BÀN PHÍM GAMING" },
  { value: "chuột-gaming", label: "CHUỘT GAMING" },
  { value: "lót-chuột", label: "LÓT CHUỘT" },
  { value: "ghế-gaming", label: "GHẾ GAMING" },
  { value: "bàn-gaming", label: "BÀN GAMING" },
  { value: "tai-nghe", label: "TAI NGHE" },
  { value: "mô-hình", label: "MÔ HÌNH" },
  { value: "tay-cầm-gaming", label: "TAY CẦM GAMING" },
  { value: "loa-máy-tính", label: "LOA MÁY TÍNH" },
  { value: "phụ-kiện-máy-tính", label: "PHỤ KIỆN MÁY TÍNH" },
];

export const dataBrand = [
  "All",
  "BOSHAN",
  "DAREU",
  "CIDOO",
  "FUHLEN",
  "ESONNE",
  "LẮC-ĐẦU",
];

function ManagerProducts(props) {
  const [listProduct, setListProduct] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(29);
  const [current, setCurrent] = useState(1);

  //Search // filter // patination
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchName, setSearchName] = useState("");

  //DATA CREATE PRODUCTS
  const [open, setOpen] = useState(false);
  const [dataNewProduct, SetDataNewPRoduct] = useState({});

  //CREATE PRODUCT
  const showModalCreateProducts = () => {
    setOpen(true);
  };
  const onCloseModalCreateProduct = () => {
    setOpen(false);
  };

  //list search antd
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
            <EyeOutlined onClick={showModalCreateProducts} />
          </a>
          <a>
            <EditOutlined />
          </a>
          <a>
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn vẫn muốn xóa SP chứ?"
              onConfirm={() => deleteProduct(record._id)}
              // onCancel={cancel}
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

  //Onchange pagination
  const handleOnChangeTable = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize != pageSize) {
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
    } else {
      toast.error("Xóa thất bại");
    }
  };

  // HANDLE CREATE PRODUCT
  // const createApiProduct = async (product) => {
  //   const res = await callCreateProduct(product);
  //   if (res && res.data) {
  //     toast.success("Tạo sản phẩm thành công");
  //     fetchProduct();
  //   } else {
  //     toast.error("Tạo sản phẩm thất bại");
  //     return;
  //   }
  // };

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
        open={open}
        onClose={onCloseModalCreateProduct}
        setOpen={setOpen}
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
          <h1>Table products</h1>
          <Button
            type="primary"
            onClick={showModalCreateProducts}
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

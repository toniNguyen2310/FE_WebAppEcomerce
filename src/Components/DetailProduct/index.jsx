import React, { useEffect, useState } from "react";
import "./detailProduct.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductById } from "../../services.js/api";
import { dataCategory } from "../AdminControl/ManagerProducts";
import ProductDetailLayout from "./ProductDetailLayout";
import SkeletonProductLayout from "../Skeleton/SkeletonProductLayout";

function stringToSlug(str) {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
}

function DetailProduct(props) {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");

  const fetchDataPRoduct = async (id) => {
    const res = await getProductById(id);
    setIsLoading(true);
    if (res && res.data) {
      setDataProduct(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPRoduct(id);
  }, [id]);

  useEffect(() => {
    console.log(dataProduct?.category);
    const found = dataCategory.find((e) => e.value === dataProduct?.category);
    setCategoryName(found?.label);
  }, [dataProduct]);

  return (
    <div className="page-cover">
      <div className="product">
        <nav className="product-header">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          &nbsp;/&nbsp;
          <span
            onClick={() => navigate(`/category/${stringToSlug(categoryName)}`)}
            style={{ cursor: "pointer" }}
          >
            {categoryName}
          </span>
          &nbsp;/&nbsp; {dataProduct.name}
        </nav>
        {isLoading ? (
          <SkeletonProductLayout />
        ) : (
          <ProductDetailLayout dataProduct={dataProduct} />
        )}
      </div>
    </div>
  );
}

export default DetailProduct;

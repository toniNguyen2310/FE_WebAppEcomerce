import React, { useState } from "react";
import { Select, Space } from "antd";

function SelectCategory(props) {
  const { dataCategory, dataBrand, setSearchCategory, setSearchBrand } = props;

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    dataCategory ? setSearchCategory(value) : setSearchBrand(value);
  };

  return (
    <Space wrap>
      <Select
        defaultValue={dataCategory ? "Category" : "Brand"}
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={
          dataCategory
            ? dataCategory.map((category) => {
                return { value: category.value, label: category.label };
              })
            : dataBrand.map((dataBrand) => {
                return { value: dataBrand.value, label: dataBrand.label };
              })
        }
      />
    </Space>
  );
}

export default SelectCategory;

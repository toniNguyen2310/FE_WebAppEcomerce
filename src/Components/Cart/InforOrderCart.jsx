import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function InforOrderCart(props) {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    note,
    setNote,
  } = props;
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  //INFOR USER DEFAULT WHEN AUTHENTICATED
  const setDefaultInfoCa = () => {
    if (!isAuthenticated) {
      return;
    }
    setName(user.username);
    setPhone(user.phone);
    setEmail(user.email);
    setAddress(user.address || "");
  };

  useEffect(() => {
    setDefaultInfoCa();
  }, [user]);
  return (
    <div className="address">
      <div className="address-left">
        <div className="full-size">
          <input
            type="text"
            placeholder="Email"
            className="input-name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="full-size">
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="full-size">
          <input
            type="number"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="full-size">
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="address-right">
        <div className="full-size">
          <textarea
            type="text"
            placeholder="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default InforOrderCart;

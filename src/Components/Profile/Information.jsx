import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editInforUSer } from "../../services.js/api";
import { doEditAccount } from "../../redux/account/accountSlice";

function Information(props) {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");

  //REF
  const nameRef = useRef();
  const phoneRef = useRef();

  //HANDLE DEFAUL INFOR
  const setDefaultInfo = () => {
    if (!isAuthenticated) {
      return;
    }
    setUsername(user.username);
    setPhone(user.phone);
    setEmail(user.email);
    setBirthday(user.birthday || "");
    setAddress(user.address || "");
  };

  //REGEX PHONE
  const regexPhoneNumber = (phone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return phone.match(regexPhoneNumber) ? true : false;
  };

  //REGEX NAME
  const regexName = (name) => {
    const regexNameMAtch = /[a-zA-Z]+(?: [a-zA-Z]+)+/gm;
    return name.match(regexNameMAtch) ? true : false;
  };

  //HANDLE UPDATE INFOR
  const handleUpdateInfoUser = async () => {
    console.log("infor>>> ", userName, email, phone, address, birthday);
    if (!isAuthenticated) {
      return;
    }
    if (
      userName === user.username &&
      phone === user.phone &&
      address === user.address &&
      birthday === user.birthday
    ) {
      toast.error("Bạn cần thay đổi thông tin");
      return;
    }
    if (!userName || !email || !phone || !address) {
      if (!userName) {
        toast.error("Tên không được để trống!");
        nameRef.current.focus();
        return;
      }

      if (!phone) {
        toast.error("SĐT không được để trống!");
        phoneRef.current.focus();
        return;
      }
      if (!regexPhoneNumber(phone)) {
        toast.error("SĐT không đúng định dạng!");
        phoneRef.current.focus();
        return;
      }
      if (!address) {
        toast.error("Địa chỉ không được để trống");
        return;
      }
    }

    if (user._id) {
      let data = {
        id: user._id,
        user: {
          username: userName.trim(),
          phone: phone.trim(),
          birthday: birthday.trim(),
          address: address.trim(),
        },
      };
      console.log("data>> ", data);
      const res = await editInforUSer(data);
      if (res && res.data) {
        toast.success("Cập nhật thành công");
        dispatch(doEditAccount(data.user));
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    setDefaultInfo();
    console.log("run");
    console.log("usr> ", user);
  }, [user]);

  return (
    <div className="user-profile">
      <h2 className="mg-20px title">Thông tin cá nhân</h2>
      <form>
        <div className="form-group pb-3 mg-20px">
          <label htmlFor="exampleInputEmail1">Tài khoản</label>
          <input
            type="email"
            className="form-control mg5px input-disable"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group  pb-3 mg-20px">
          <label htmlFor="exampleInputname">Họ và tên</label>
          <input
            type="text"
            className="form-control mg5px"
            id="exampleInputname"
            placeholder="Họ và tên"
            value={userName}
            ref={nameRef}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group  pb-3 mg-20px">
          <label htmlFor="exampleInputPhone">Số điện thoại</label>
          <input
            type="number"
            className="form-control mg5px"
            id="exampleInputPhone"
            placeholder="Số điện thoại"
            value={phone}
            ref={phoneRef}
            onChange={(e) => setPhone(e.target.value)}
            // onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
        <div className="form-group  pb-3 mg-20px">
          <label htmlFor="exampleInputBirthday">Ngày sinh</label>
          <input
            type="date"
            className="form-control mg5px"
            id="exampleInputBirthday"
            placeholder="Ngày sinh"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="form-group mb-3 mg-20px ">
          <label htmlFor="inputAddress">Địa chỉ</label>
          <input
            type="text"
            className="form-control  mg5px"
            id="inputAddress"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="button-user">
          <button
            type="button"
            className="btn btn-success me-2 mb-2 "
            onClick={handleUpdateInfoUser}
            //   disabled={isLoading}
          >
            {/* {isLoading && (
            <span
              className="spinner-grow spinner-grow-sm ms-1"
              style={{ color: "#ffffff00" }}
              role="status"
            ></span>
          )}
  
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm ms-1"
              role="status"
            ></span>
          )} */}
            Cập nhật
          </button>
          <button
            type="button"
            className="btn btn-secondary mb-2"
            onClick={setDefaultInfo}
          >
            Huỷ thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

export default Information;

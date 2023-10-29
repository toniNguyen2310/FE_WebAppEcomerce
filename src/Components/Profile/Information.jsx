import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInforUSer } from "../../services.js/api";
import { doEditAccount } from "../../redux/account/accountSlice";
import { message } from "antd";
import LoadingButton from "../Export/ExportVarible";

function Information(props) {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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

  //HANDLE UPDATE INFOR
  const handleUpdateInfoUser = async () => {
    setIsLoading(true);
    // console.log("infor>>> ", userName, email, phone, address, birthday);
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    if (
      userName === user.username &&
      phone === user.phone &&
      address === user.address &&
      birthday === user.birthday
    ) {
      message.info("Thông tin chưa được thay đổi");
      setIsLoading(false);
      return;
    }
    if (!userName || !email || !phone || !address) {
      if (!userName) {
        message.info("Bạn cần thay đổi thông tin");
        setIsLoading(false);
        nameRef.current.focus();
        return;
      }

      if (!phone) {
        message.info("SĐT không được để trống");
        setIsLoading(false);
        phoneRef.current.focus();
        return;
      }

      if (!address) {
        message.error("Địa chỉ không được để trống");
        setIsLoading(false);
        return;
      }
    }
    if (!regexPhoneNumber(phone)) {
      message.error("SĐT không đúng định dạng");
      setIsLoading(false);
      phoneRef.current.focus();
      return;
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
      // console.log("data>> ", data);
      const res = await editInforUSer(data);
      if (res && res.data) {
        message.success("Cập nhật thành công");
        dispatch(doEditAccount(data.user));
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    setDefaultInfo();
    // console.log("run");
    // console.log("usr> ", user);
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
          >
            Cập nhật
            {isLoading && (
              <LoadingButton color={"#29a07e"} secondaryColor={"#ffffff"} />
            )}
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

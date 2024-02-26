import { message, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingButton from "../../Components/Loading/LoadingButton"
import { callRegister } from "../../services.js/api";
import "./register.scss";
import { useEnterSubmit } from "../../utils/hooks/useEnterSubmit";
import { validateEmail, validatePhone } from "../../utils/constant";

function RegisterPage(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const topRight = "topRight";



  //HANDLE REGISTER
  let isDuplicate = false;
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !username || !password) {
      api.info({
        message: `Vui lòng nhập thông tin `,
        // description:
        //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        topRight,
      });
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      api.info({
        message: `Vui lòng nhập lại Email `,
        description:
          "Định dạng email bao gồm hai phần chính là trước và sau @, ví dụ như abc@gmail.com ",
        topRight,
      });
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      api.info({
        message: `Vui lòng nhập lại mật khẩu `,
        description: "Mật khẩu cần tối thiểu 6 ký tự ",
        topRight,
      });
      setIsLoading(false);

      return;
    }
    if (!validatePhone(phone)) {
      api.info({
        message: `Vui lòng nhập lại số điện thoại`,
        topRight,
      });
      setIsLoading(false);
      return;
    }

    const res = await callRegister(
      email.toLowerCase().trim(),
      username.trim(),
      password.trim(),
      phone.trim()
    );

    if (res?.data?._id && !isDuplicate) {
      setIsLoading(false);
      message.success("Đăng ký tài khoản thành công");
      navigate("/login");
      isDuplicate = true;
    } else {
      setIsLoading(false);
      message.error("Email đã tồn tại hãy thử lại");
      return;
    }
    refInput.current.focus();
    setIsShowPass(false);
    setEmail("");
    setUserName("");
    setPassword("");
    setPhone("");
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div className="register-page">
      {contextHolder}
      <div className="register-page-form">
        <div className="register-page-form-lorup">
          <NavLink to={`/login`}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Đăng ký
          </NavLink>
        </div>

        <div className="register-page-form-container">
          {/* Email */}
          <form name="myForm">
            <div className="register-page-form-container-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Vui lòng nhập email của bạn"
                ref={refInput}
                value={email}
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="register-page-form-container-input">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                id="name"
                placeholder="Họ và tên"
                value={username}
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="register-page-form-container-input input-password">
              <label htmlFor="passwordregister">Mật khẩu</label>
              <input
                id="passwordregister"
                type={isShowPass ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              {isShowPass ? (
                <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setIsShowPass(!isShowPass)}
                />
              )}
            </div>

            {/* Phone Number */}
            <div className="register-page-form-container-input">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                id="phone"
                placeholder="Số điện thoại ...."
                value={phone}
                onWheel={(event) => event.currentTarget.blur()}
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="register-page-form-footer">
          <a
            href=""
            className="register-page-form-footer-btn"
            onClick={handleRegister}
          >
            Đăng ký{" "}
            {isLoading && (
              <LoadingButton color={"#29a07e"} secondaryColor={"#ffffff"} />
            )}
          </a>

          <p>
            Bạn đã có tài khoản&nbsp;
            <NavLink to={`/login`}>Đăng nhập ngay!!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

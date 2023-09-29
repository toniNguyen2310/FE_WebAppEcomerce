import React from "react";
import "./footer.scss";
import { MdLocationOn } from "react-icons/md";
import { BiLogoGmail, BiSolidPhoneCall } from "react-icons/bi";
function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-cover">
        <div className="box-footer">
          <p className="box-footer-title">VỀ LẮC ĐẦU</p>
          <div>
            <p>Giới thiệu</p>
            <p>Tuyển dụng</p>
          </div>
          <div className="infor"></div>
        </div>
        <div className="box-footer">
          <p className="box-footer-title">HỖ TRỢ KHÁCH HÀNG</p>
          <div>
            <p>Hướng dẫn mua hàng trực tuyến</p>
            <p>Hướng dẫn thanh toán</p>
            <p>Gửi yêu cầu bảo hành</p>
            <p>Góp ý, Khiếu Nại</p>
          </div>
        </div>
        <div className="box-footer">
          <p className="box-footer-title">CHÍNH SÁCH CHUNG</p>
          <div>
            <p>Chính sách, quy định chung</p>
            <p>Chính sách vận chuyển</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách đổi trả và hoàn tiền</p>
          </div>
        </div>
        <div className="box-footer">
          <p className="box-footer-title">LIÊN HỆ</p>
          <div>
            <p>
              <MdLocationOn />
              Đình Thôn, Nam Từ Liêm, Hà Nội
            </p>
            <p>
              <BiLogoGmail /> lacdaushop@gmail.com
            </p>
            <p>
              <BiSolidPhoneCall />
              0349.xxx.461
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          Copyright © 2023 <a href="https://lacdau.com/">lacdau.com</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;

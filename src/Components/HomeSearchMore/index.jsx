import React from "react";
import "./homeSearchMore.scss";
function HomeSearchMore(props) {
  return (
    <div className="home-list-category">
      <div className="home-title">
        <span>
          <a>DANH MỤC SẢN PHẨM</a>
        </span>
      </div>
      <div className="home-category">
        <div className="home-category-list">
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/lot-chuot");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/l/o/lot-chuot-s-case-chong-moi-co-tay.png"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Lót chuột</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/chuot-gaming");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://file.hstatic.net/200000722513/file/chuot_aa348bf0177b4795a39ab66d51e62ed7.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Chuột gaming</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/ban-phim-gaming");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://product.hstatic.net/200000722513/product/ban-phim-co-gaming-dareu-ek87-v2-led-rgb-04_4233d17ae0734ed198d0e5b927f6aa11_master.png"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Bàn phím</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/tai-nghe");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://file.hstatic.net/200000722513/file/tai_nghe_ed3b4f52172f40929e1d3ab493099b73.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Tai nghe</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/tay-cam-gaming");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://product.hstatic.net/200000722513/product/photo_2023-05-20_11-31-09_f50b9da563444097b85cb643726fdf81_016f95a091be451d8024299ba4d66484_master.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Tay cầm</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/loa");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/marshall_emberton_2.png"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Loa</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/mo-hinh");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnaj8Zy9CcUf1CQelg2TKRTY_v9LAbbsP_atw-jNyGuQhzH-p2p-xsv9Fmp3TfF4S0E2A&usqp=CAU"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Mô hình</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/phu-kien");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://file.hstatic.net/200000636033/file/icon19_0197366bbf124fed9b939c9b7075c2db.png"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Phụ kiện</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/ghe-gaming");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://file.hstatic.net/200000722513/file/ghe_e1ff4e3493f14aa982676b3c4574135e.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Ghế gaming</a>
            </div>
          </div>
          <div
            className="home-category-list-item"
            onClick={() => {
              navigate("/category/ban-gaming");
            }}
          >
            <div className="home-category-list-item-img">
              <a href="">
                <img
                  loading="lazy"
                  src="https://product.hstatic.net/200000722513/product/345_dff6987a86c3729d2bd253_8b4d40fa7ccf4b98aa0b0ccbd3e782a5_96cefaa165794d6ebfe4067b87574283_master.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="home-category-list-item-title">
              <a href="">Bàn gaming</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSearchMore;

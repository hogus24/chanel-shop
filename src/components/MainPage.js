import { API_URL } from "../config/constants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { Carousel } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  let [products, setProducts] = React.useState([]);
  let [banners, setBanner] = React.useState([]);
  // useEffect -> 컴포넌트가 랜더 될 때 딱 한번 실행
  // useEffect (axios()=>{})

  useEffect(() => {
    // products 통신
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        products = res.data.product;
        setProducts(products);
      })
      .catch((err) => {
        return console.log(err);
      });
    // banners 통신
    axios
      .get(`${API_URL}/banners`)
      .then((res) => {
        banners = res.data.banners;
        setBanner(banners);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  return (
    <>
      <div id="body">
        <Carousel autoplay autoplaySpeed={3000}>
          {banners.map((banner, index) => {
            return (
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} />
                </div>
              </Link>
            );
          })}
        </Carousel>
        <h2>Products</h2>
        <div id="product-list">
          {products.map((product, idx) => {
            console.log("map에서 반환된 products", products, idx);
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/product/${product.id}`}>
                  <div>
                    <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-footer">
                      <div className="product-seller">
                        <img className="product-avatar" src="images/icons/avatar.png" alt="avatar" />
                        <span>{product.seller}</span>
                      </div>
                      <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;

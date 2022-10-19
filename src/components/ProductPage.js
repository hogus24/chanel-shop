import { API_URL } from "../config/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  let navi = useNavigate();
  const { id } = useParams();
  // useState(null) -> 괄호안에 [] 를 넣지 않은 이유 = Postman 에 각 상품의 데이터베이스에 배열("[]")을 사용하지 않았기 때문 !
  // useState(null) 앞에 React. 를 작성하지 않은 이유 = import 할때 React 에서 가져온게 아니기 때문 !
  let [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        product = res.data.product;
        setProduct(product);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  if (product === null) {
    return <h1>상품정보를 받고있습니다.</h1>;
  }

  return (
    <>
      <div id="items-box">
        <div id="items-list">
          <div id="image-box">
            <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
          </div>
          <div id="profile-box">
            <img src="/images/icons/avatar.png" alt={product.selller} />
            <span className="product-seller">{product.seller}</span>
          </div>
          <div id="content-box">
            <div id="name">{product.name}</div>
            <div id="price">{product.price}원</div>
            <div id="desc">{product.description}</div>
          </div>
        </div>
        <button onClick={() => navi("/")}>뒤로가기</button>
      </div>
    </>
  );
};
export default ProductPage;

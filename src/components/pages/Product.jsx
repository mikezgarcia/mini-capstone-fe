import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as actionProduct from "../../redux/actions/actionProduct";
import * as actionCart from "../../redux/actions/actionCart";
import Skeleton from "react-loading-skeleton";
import Footer from "../Footer";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function Product() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const { getProduct } = bindActionCreators(actionProduct, useDispatch());
  const { addToCart } = bindActionCreators(actionCart, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getProduct(id).then((response) => {
      setProduct(response.payload);
      setLoading(false);
    });
  }, [id]);

  const addProductToCart = (productId) => {
    if (localStorage.email) {
      addToCart(localStorage.email, productId);
      window.location.reload();
    }
  };

  const renderProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={
              product.imageLink
                ? `https://minicapstone-be.herokuapp.comproduct/${product.productId}/download`
                : "/images/empty-image.jpeg"
            }
            alt={product.productName}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.filter}</h4>
          <h1 className="display-5">{product.productName}</h1>
          <p className="lead fw-bolder">
            Rating {product.ratings} <FontAwesomeIcon icon={faStar} />
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProductToCart(product.productId)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </Link>
        </div>
      </>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
        </div>
      </>
    );
  };

  return (
    <>
      <div id="product">
        <div className="container py-5">
          <div className="row py-4">
            {loading ? renderLoading() : renderProduct()}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

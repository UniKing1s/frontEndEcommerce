import React, { useEffect, useRef, useState } from "react";
import productCallApi from "../../utils/apiCaller";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import AddProductToCart from "../../service/addProductToCart";
import { updateCart } from "../../redux/cartSlice";
import SaveCartItem from "../../service/SaveCartItem";
import { imgAPI_URL } from "../../constants/Config";
// import ButtonAddToCart from "../../components/buttonAddToCart/buttonAddToCart";

const ProductPage = (props) => {
  const param = useParams();
  const product = useRef({});
  const loaded = useRef(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const getProductById = (id) => {
    console.log(loading);
    const productId = { _id: id };
    productCallApi("byId/", "put", productId)
      .then((res) => {
        product.current = res.data;
        // product.masp = res.data.masp;
        // product.name = res.data.name;
        // product.type = res.data.type;
        // product.price = res.data.price;
        // product.sale = res.data.sale;
        // product.status = res.data.status;
        // product.img = res.data.img;
        // product.decribtion = res.data.decribtion;
        loaded.current = true;
        console.log(product);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Không có sản phẩm tương ứng");
      });
  };
  const addToCart = () => {
    if (Number(quantity) >= 1) {
      const cart = {
        masp: product.current.masp,
        name: product.current.name,
        price: product.current.price,
        sale: product.current.sale,
        img: product.current.img,
        quantity: Number(quantity) >= 1 ? Number(quantity) : 1,
        totalPrice:
          Number(product.current.price) * (1 - product.current.sale / 100),
      };
      dispatch(updateCart(cart));
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      toast.warning("Số lượng nhỏ hơn 1 không thể thêm vào giỏ hàng");
    }
  };
  useEffect(() => {
    getProductById(param.id);
  });
  const decrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div key={props.index}>
      <ToastContainer />
      <SaveCartItem />
      {loaded.current ? (
        <>
          <div>
            <section className="py-5">
              <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                  <div
                    className="col-md-6"
                    // style={{ border: "solid", borderRadius: "10px" }}
                  >
                    <img
                      className="card-img-top mb-5 mb-md-0"
                      src={imgAPI_URL + product.current.img}
                      style={{ margin: "0 auto" }}
                      // src={product.current.img}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    {/* <div className="small mb-1">SKU: BST-498</div> */}
                    <h1 className="display-5 fw-bolder">
                      {product.current.name}
                    </h1>
                    <div className="fs-5 mb-5">
                      {/* <span className="text-decoration-line-through">$45.00</span> */}
                      <span>
                        Giá:{" "}
                        {product.current.sale > 0 ? (
                          <>
                            <strong style={{ color: "red" }}>
                              <del>
                                {new Intl.NumberFormat("vi", {
                                  currency: "VND",
                                  style: "currency",
                                }).format(product.current.price)}
                              </del>
                            </strong>
                          </>
                        ) : (
                          <></>
                        )}
                        <br></br>
                        {product.current.sale > 0 ? (
                          <>
                            <strong>
                              {new Intl.NumberFormat("vi", {
                                currency: "VND",
                                style: "currency",
                              }).format(
                                product.current.price *
                                  (1 - product.current.sale / 100)
                              )}
                            </strong>
                          </>
                        ) : (
                          <>
                            <strong>
                              {new Intl.NumberFormat("vi", {
                                currency: "VND",
                                style: "currency",
                              }).format(product.current.price)}
                            </strong>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="lead">{product.current.decribtion}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-dark flex-shrink-0"
                        style={{ margin: "3px" }}
                        type="button"
                        onClick={() => decrease()}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary flex-shrink-0"
                        type="button"
                      >
                        {quantity}
                      </button>
                      <button
                        className="btn btn-dark flex-shrink-0"
                        type="button"
                        style={{ margin: "3px" }}
                        onClick={() => increase()}
                      >
                        +
                      </button>
                      {/* <input
                        className="form-control text-center me-3"
                        id="inputQuantity"
                        type="number"
                        value={quantity}
                        min={1}
                        style={{ width: "5rem" }}
                        onChange={(e) => setQuantity(e.target.value)}
                      /> */}
                      <button
                        className="btn btn-outline-dark flex-shrink-0"
                        type="button"
                        onClick={() => addToCart()}
                      >
                        <i className="bi-cart-fill me-1"></i>
                        Thêm vào giỏ hàng
                      </button>
                      {/* <ButtonAddToCart addToCart={addToCart} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>No Product matching</>
      )}
    </div>
  );
};

export default ProductPage;

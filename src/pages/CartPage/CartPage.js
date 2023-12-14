import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartItem from "../../components/cartItem/cartItem";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { deleteCart, updateCart } from "../../redux/cartSlice";

const CartPage = () => {
  const carts = useSelector((state) => state.cart);
  console.log(carts);
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  const ditpatch = useDispatch();
  const onDelete = (cart) => {
    ditpatch(deleteCart(cart));
    // setLocalItem();
  };
  const increaseQuantity = (carts) => {
    ditpatch(updateCart(carts));
  };
  const decreaseQuantity = (carts) => {
    ditpatch(updateCart(carts));
  };

  const showProductItem = () => {
    var result = null;
    if (carts.length > 0) {
      result = carts.map((cartItem, index) => {
        return (
          <CartItem
            key={index}
            cartItem={cartItem}
            index={index}
            onDelete={onDelete}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            // updateQuantity={updateQuantity}
          />
        );
      });
    }
    return result;
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <NavLink
            to="/"
            className="btn btn-primary mt-10 m-a"
            //type="button"
            //value="Thêm sản phẩm"
          >
            Thêm sản phẩm
          </NavLink>
          <div className="panel panel-primary li-box">
            <div className="panel-heading">
              <h3 className="panel-tittle">Giỏ hàng</h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">Tên</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Giảm giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tổng giá</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{showProductItem()}</tbody>
                </table>
              </div>

              {/* <ProductList products={products} onDelete={this.onDelete} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

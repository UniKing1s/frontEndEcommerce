import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import CartItem from "../../components/cartItem/cartItem";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { deleteCart, updateCart } from "../../redux/cartSlice";
import { useHistory } from "react-router-dom";

const CartPage = () => {
  // const [totalBill, setBills] = useState(0);
  const carts = useSelector((state) => state.cart);
  const accountLoged = useSelector((state) => state.account.logged);
  const totalBill = useRef(0);
  const navi = useHistory();
  useEffect(() => {
    return () => {
      totalBill.current = 0;
      if (carts.length > 0) {
        totalBill.current = 0;

        // carts.forEach(
        //   (e) =>
        //     (totalBill.current =
        //       Number(totalBill.current) + Number(e.totalPrice))
        // );
      }
    };
  }, [carts]);
  if (carts.length > 0) {
    totalBill.current = 0;
    // setBills(0);
    carts.forEach(
      (e) =>
        (totalBill.current = Number(totalBill.current) + Number(e.totalPrice))
    );
  }
  console.log(carts);
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  const checkCartToPay = () => {
    let value = 0;
    carts.forEach((e) => (value = value + e.quantity));
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  };
  const showTotal = () => {
    let value = 0;
    carts.forEach((e) => (value = value + e.totalPrice));
    return value;
  };
  const submitDatHang = () => {
    if (checkCartToPay()) {
      if (accountLoged) {
        navi.push("/thanhToan");
      } else {
        navi.push("/login");
      }
    } else {
      toast.error("Bạn hiện tại không có sản phẩm để thanh toán");
    }
  };
  const ditpatch = useDispatch();
  const onDelete = (cart) => {
    ditpatch(deleteCart(cart));
  };
  const increaseQuantity = (carts) => {
    totalBill.current = 1;
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
          <div className="form-floating mb-3">
            <button
              className="btn btn-primary mt-10 m-a"
              style={{ textAlign: "center", width: "100%" }}
              onClick={() => submitDatHang()}
            >
              <strong>
                Đặt hàng{" "}
                {new Intl.NumberFormat("vi", {
                  currency: "VND",
                  style: "currency",
                }).format(showTotal())}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

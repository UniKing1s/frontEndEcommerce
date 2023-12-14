import "./App.css";
import Header from "./components/header/Header";
// import AddProductPage from "./pages/AddProductPage/AddProductPage";
// import ListProduct from "./pages/ProductListPage/ListProduct";
import routes from "./routes";
// import { useDispatch, useSelector } from "react-redux";
// import React, { Component } from "react";
import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import { updateAccount } from "./redux/accountSlice";
// import { updateArrayCart } from "./redux/cartSlice";

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const checkLogin = () => {
  //     const account = JSON.parse(localStorage.getItem("_token"));
  //     const cart = JSON.parse(localStorage.getItem("cart"));
  //     const ob = []
  //     console.log(cart);
  //     console.log(account);
  //     if (account.length > 0) {
  //       dispatch(updateAccount(account));
  //     }

  //     if (cart.length > 0) {
  //       dispatch(updateArrayCart(cart));
  //     }
  //     console.log(account);
  //     console.log(cart);
  //   };
  //   checkLogin();
  // });
  // const carts = useSelector((state) => state.card);
  // console.log(carts);
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
const [screenHeight, setScreenHeight] = useState();
  useEffect(() => {
    return () => {
      setScreenHeight(window.innerHeight);
    };
  }, [window.innerHeight]);
  return (
    <>
      <Router>
        <Header />
          <main>
            <div className="App" style={{
                  top: "0",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  minHeight: "100vh",
                  height: { screenHeight } + "px",
                  position: "relative",
                }}>
              {/* <ListProduct /> */}
              {showContentMenus(routes)}
            </div>
          </main>
      </Router>
      {/* <AddProductPage />; */}
    </>
  );
};

export default App;

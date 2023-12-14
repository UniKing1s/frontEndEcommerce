import React, { Component } from "react";
import CardItem from "../../components/cardItem/CardItem";
import Introdution from "../../components/introdution/introdution";
import "./HomePage.scss";
import productCallApi from "../../utils/apiCaller";
import { ToastContainer, toast } from "react-toastify";
class HomePage extends Component {
  state = {
    products: {},
  };
  loading = true;
  componentDidMount() {
    productCallApi("", "get", null).then((res) => {
      //console.log(res.data);
      this.setState({
        products: res.data,
      });
      this.loading = false;
    });
  }
  toastMess = (type, mess) => {
    if (type === "err") {
      toast.error(mess);
    } else {
      toast.success(mess);
    }
  };
  showCardItem = () => {
    var result = null;
    if (this.state.products.length > 0) {
      result = this.state.products.map((product, index) => {
        return (
          <CardItem key={index} product={product} toastMess={this.toastMess} />
        );
      });
    }
    return result;
  };
  render() {
    return (
      <>
        <div>
          <ToastContainer />
          {this.loading ? (
            <div className="container mt-10">
              <div className="spinner-border text-primary m-a" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Introdution />
              <div className="container mt-10">
                <div className="text-center">
                  <div className="row" id="itemContent">
                    {this.showCardItem()}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
export default HomePage;

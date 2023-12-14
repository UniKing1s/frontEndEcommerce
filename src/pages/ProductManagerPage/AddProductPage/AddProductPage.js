import React, { Component } from "react";
import "./AddProductPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productCallApi from "../../../utils/apiCaller";
import { NavLink } from "react-router-dom";
// import Select from "react-select";
// import FileSaver from "file-saver";
class AddProductPage extends Component {
  state = {
    name: "",
    quantity: 0,
    price: 0,
    sale: 0,
    type: 1,
    decribtion: "",
    status: "còn hàng",
    // img: "",
  };
  img = null;
  imgExL =
    "https://kenh14cdn.com/2020/7/8/sneakerbeatt980786952386496440807699102621998261586840n-15941830338201855570678.jpg";

  handleChangeStatus = () => {
    //event.preventDefault();
    this.state.status === "còn hàng"
      ? this.setState({
          status: "hết hàng",
        })
      : this.setState({
          status: "còn hàng",
        });
  };
  formData = new FormData();
  handleChangeImgInput = async (event) => {
    this.img = event.target.files[0];
    this.formData.append("image", event.target.files[0]);
    // this.setState({
    //   img: "1",
    // });
    ///đưa sang dạng base64 và lưu vào db
    // const img = await this.imageBase64(event.target.files[0]);
    // this.setState({
    //   img: img,
    // });
    // console.log(this.state.img);
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  checkSpacing = (input) => {
    const inputArray = Array.from(input);
    const InputLength = inputArray.length;
    let i = 0;
    inputArray.forEach((e) => {
      if (e === " ") {
        i = Number(i) + 1;
      }
    });
    if (i >= InputLength) {
      return true;
    } else {
      return false;
    }
  };
  onSave = async () => {
    // const formData = new FormData();
    console.log(this.checkSpacing(this.state.name));
    if (this.checkSpacing(this.state.name)) {
      toast.error("Tên sản phẩm không hợp lệ");
    } else {
      if (this.img === null) {
        toast.error("Chưa có file ảnh");
      } else {
        console.log(this.formData);
        if (this.state.name !== "") {
          productCallApi("uploadImage/", "post", this.formData)
            .then((res) => {
              if (res.status === 200) {
                this.state["img"] = res.data.filename;
                productCallApi("", "post", this.state)
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      toast.success("Thêm sản phẩm thành công");
                      window.location.href = "listProduct";
                    }
                  })
                  .catch((err) => {
                    toast.error("Upload Lỗi");
                  });
              }
            })
            .catch((err) => {});
        }
      }
    }
  };
  // imageBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   const data = new Promise((resolve, reject) => {
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (err) => reject(err);
  //   });
  //   return data;
  // };
  render() {
    // const [masp, setMaSp] = useState("");
    const { update } = this.props;
    return (
      <>
        <ToastContainer />
        <div className="container">
          <div className="panel panel-primary w-50 magin-a box">
            <div
              className="container"
              style={{ width: "95%", marginTop: "20px" }}
            >
              <div className="panel-heading">
                <h3 className="panel-tittle" style={{ textAlign: "center" }}>
                  {!update ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                </h3>
              </div>
              <div className="panel-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Tên sản phẩm"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <label htmlFor="floatingInput">Tên sản phẩm</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Số lượng"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChange}
                  />
                  <label htmlFor="floatingInput">Số lượng</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Giá trị"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                  <label htmlFor="floatingInput">Giá trị</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Số lượng"
                    name="sale"
                    min={0}
                    max={100}
                    value={this.state.sale}
                    onChange={this.onChange}
                  />
                  <label htmlFor="floatingInput">Giảm giá</label>
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Loại
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                  >
                    <option>Choose...</option>
                    <option value="1">SAMSUNG</option>
                    <option value="2">iPhone</option>
                    <option value="3">OPPO</option>
                    <option value="4">XIAOMI</option>
                    <option value="5">VIVO</option>
                    <option value="6">realme</option>
                    <option value="7">Nokia</option>
                    <option value="8">mobell</option>
                    <option value="9">itel</option>
                    <option value="10">Masstel</option>
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="decribtion"
                    placeholder="Mô tả sản phẩm"
                    name="decribtion"
                    value={this.state.decribtion}
                    onChange={this.onChange}
                  />
                  <label htmlFor="floatingInput">Mô tả</label>
                </div>

                <div className="form-floating mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={this.state.status === "còn hàng" ? true : false}
                      onChange={() => this.handleChangeStatus()}
                    />
                    <label
                      className="form-check-label lbl"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {this.state.status === "còn hàng"
                        ? "Còn hàng"
                        : "Hết hàng"}
                    </label>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="img">
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={this.handleChangeImgInput}
                  />
                </div>
                {/*<div className="form-floating mb-3">
                  <img
                    className="imgAddProduct"
                    src={this.state.img === "" ? this.imgExL : this.img}
                    alt=""
                  ></img>
                  <br></br>
                  <br></br>
                </div>*/}
              </div>
            </div>
            <div className="form-floating mb-3">
              <button
                type="button"
                className="btn btn-success mr-10"
                onClick={() => this.onSave()}
              >
                Lưu
              </button>
              <NavLink
                type="button"
                className="btn btn-danger"
                to="/listProduct"
              >
                Hủy
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddProductPage;

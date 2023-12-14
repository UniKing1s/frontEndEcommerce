import React, { Component } from "react";
import "./introdution.scss";
class Introdution extends Component {
  render() {
    return (
      <div id="carouselExample" className="carousel slide w-100 mt-10">
        <div
          className="carousel-inner m-l-r"
          style={{ height: "125px", margin: "auto", width: "90%" }}
        >
          <div className="carousel-item active">
            <img
              src="https://i.imgur.com/CvRKNQL.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.imgur.com/GjyjXhZ.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.imgur.com/CvRKNQL.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}

export default Introdution;

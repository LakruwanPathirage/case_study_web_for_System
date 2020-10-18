import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../images/companylogo.png";
class Header extends Component {
  render() {
    return (
      <div className="d-flex bg-custom-cl p-3">
        <div className="align-self-start logoimage d-none d-md-inline-block">
          <img
            id="companylogo"
            src={image}
            alt=""
            className="img-fluid mb-3 rounded-circle"
            height="100px"
            width="100px"
          />
        </div>
        <div className="align-self-start ml-4 text-light align-self-center head d-none d-md-block">
          <h2 id="baneername">GSTD Constructions</h2>
        </div>

        <div className="align-self-start ml-auto head">
          <i
            className="fa fa-user-circle pr-2 custoom"
            aria-hidden="true"
            height="50px"
          />
          <p className="d-inline pr-2 border-right border-light mr-4 text-light">
            User
          </p>
          <button type="button" className="btn btn-outline-light logout ">
            log out
          </button>
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";

export default class Home extends Component {
    render() {
      return (
<div>
<section className="hero-banner">
  <div className="container">
    <div className="row no-gutters align-items-center pt-60px">
      <div className="col-5 d-none d-sm-block">
        <div className="hero-banner__img">
          <img src={require("../../src/images/construct.png")} />
        </div>
      </div>
      <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
        <div className="hero-banner__content">
          <h4 style={{ color: 'gray' }}>We build secure</h4>
          <h1 style={{ color: 'white' }}>Leaders In Quality Construction And Infrastructure</h1>
          <p style={{ color: 'white' }}>
          GSTD is one of leading construction companies in Sri Lanka which 
          was established in 2000. We were awarded the C2 grading by the Institute for 
          Construction Training and Development (ICTAD) of Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
      )
    }
}
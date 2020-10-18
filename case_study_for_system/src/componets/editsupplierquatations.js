import React, { Component } from "react";
import { db, auth } from "../services/firebase";

var ids = require("short-id");
export default class EditsupplierQuatations extends Component {
  state = {
    supllierwiseproducts: [],
  };

  //load all orders
  loadsupllierfororder = () => {
    var jj = this.props.match.params;
    let ddodc = "";

    db.collection("suporderrss")
      .doc(jj.id)
      .collection("suppliers")
      .get()
      .then(snapshot => {
        const orderr = [];
        snapshot.forEach(doc => {
          ddodc = doc.id;

          const data = doc.data();
          data.supnameid = ddodc;
          data.reqidd = jj.id;
          orderr.push(data); //push all data to arry
        });

        this.setState({ supllierwiseproducts: orderr }, function () {
          console.log(this.state.supllierwiseproducts);
        });
      })
      .catch(error => console.log(error));

    console.log(this.state.supllierwiseproducts);
  };

  componentDidMount() {
    this.loadsupllierfororder();
  }

  supplierwiseTable = products => {
    return products.map(function (singleprdtt, i) {
      return (
        <tr key={i}>
          <th scope="row">{singleprdtt.itemname}</th>
          <td>{singleprdtt.quantity}</td>
          <td>{singleprdtt.price}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container my-3">
        <div className="card card-body">
          <div className="row">
            <h3 className="px-3">Supplier Quatations</h3>
          </div>
          {this.state.supllierwiseproducts &&
            this.state.supllierwiseproducts.map(function (singlesupplier, i) {
              return (
                <div className="container mt-5">
                  <div className="row">
                    <h5 className="d-inline-box mx-2">Supplier Name</h5>
                    <h5 className="d-inline-box mx-1">
                      {singlesupplier.supnameid}
                    </h5>
                  </div>
                  <div className="row">
                    <table class="table prequement">
                      <thead class="thead-dark">
                        <tr>
                          <th>ITEM NAME</th>
                          <th>QUANTITY</th>
                          <th>PRICE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {singlesupplier.products &&
                          singlesupplier.products.map(function (objectt, i) {
                            return (
                              <tr key={i}>
                                <th scope="row">{objectt.itemname}</th>
                                <td>{objectt.quantity}</td>
                                <td>{objectt.price}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

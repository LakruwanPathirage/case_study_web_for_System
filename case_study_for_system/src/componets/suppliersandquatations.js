import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import SupplierTableRow from "./suppliertablerow";
import "bootstrap/dist/css/bootstrap.min.css";

export default class SupplierAndQuatations extends Component {
  state = {
    orderedrequisitions: null,
  };

  Loadallorders = () => {
    db.collection("suporderrss")
      .get()
      .then(snapshot => {
        const orderrequisitions = [];
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());

          orderrequisitions.push(doc);
        });
        // console.log("I am here " + requisitions[1].doocid);
        this.setState({ orderedrequisitions: orderrequisitions });
        console.log(orderrequisitions);
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.Loadallorders();
  }

  supTbleRRow = () => {
    return this.state.orderedrequisitions.map(function (object, i) {
      return <SupplierTableRow obj={object} key={i} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="card card-body">
          <div className="row">
            <div className="col-md-12">
              <table class="table prequement">
                <thead class="thead-dark">
                  <tr>
                    <th>ORDERLIST_ID</th>
                    <th>QUATATION COUNT</th>
                    <th>VIEW TENDERS</th>
                    <th>VIEW QUATATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orderedrequisitions && this.supTbleRRow()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

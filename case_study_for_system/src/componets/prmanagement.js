import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import PrTableRow from "../componets/prtablerow";
export default class PrManagementAndQuatations extends Component {
  state = {
    requisitions: null,
    number: 1,
  };
  //when user click the ammend button set status to rejected
  Ammendbttonpress = dddid => {
    let loddfun = this.Loaddata;
    db.collection("requisitions")
      .doc(dddid)
      .update({
        status: "Rejected",
      })
      .then(function () {
        loddfun();
      });

    console.log("ammend btn pressed haaaaai");
  };

  prTbleRRow = () => {
    let ammbfun = this.Ammendbttonpress;
    return this.state.requisitions.map(function (object, i) {
      return <PrTableRow obj={object} key={i} Ammendbttonpress={ammbfun} />; //send props to next component
    });
  };
  Loaddata = () => {
    let ddodc = "";
    db.collection("requisitions")
      .where("status", "==", "Pending")
      .get()
      .then(snapshot => {
        const requisitions = [];
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          ddodc = doc.id;

          const data = doc.data();
          data.doocid = ddodc;
          requisitions.push(data);
        });

        this.setState({ requisitions: requisitions });
        console.log(requisitions);
      })
      .catch(error => console.log(error));
  };

  //first load all data
  componentDidMount() {
    this.Loaddata();
  }

  //ammebd button click

  render() {
    return (
      <div className="container">
        <table class="table prequement">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>SITE NAME</th>
              <th>Site Manager</th>
              <th>AMOUNT</th>
              <th>BUDGET STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>{this.state.requisitions && this.prTbleRRow()}</tbody>
        </table>
      </div>
    );
  }
}

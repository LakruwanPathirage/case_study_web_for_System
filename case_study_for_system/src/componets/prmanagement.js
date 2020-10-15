import React, { Component } from "react";
import { db, auth } from "../services/firebase";

export default class PrManagementAndQuatations extends Component {
  state = {
    requisitions: null,
    accountBalance: 1000000,
  };
  componentDidMount() {
    db.collection("requisitions")
      .get()
      .then(snapshot => {
        const requisitions = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          requisitions.push(data);
        });

        this.setState({ requisitions: requisitions });
        console.log(requisitions);
      })
      .catch(error => console.log(error));
  }

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
          <tbody>
            {this.state.requisitions &&
              this.state.requisitions.map(single => {
                return (
                  <tr>
                    <th scope="row">{single.reqNo}</th>
                    <td>{single.location}</td>
                    <td>Supun perera</td>
                    <td>{single.total}</td>
                    <td>
                      yes{" "}
                      <button
                        type="button"
                        className={
                          this.state.accountBalance > single.total
                            ? "btn btn-disable"
                            : "btn btn-success"
                        }
                      >
                        Ammend
                      </button>
                    </td>
                    <td>Acc</td>
                  </tr>
                );
              })}
            <tr>
              <th scope="row">1</th>
              <td>colombo</td>
              <td>sumudu</td>
              <td>150000</td>
              <td>
                yes <button>Ammned</button>
              </td>

              <td>accct</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

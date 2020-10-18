import React, { Component } from "react";
import "../css/custom.css";
import { Link } from "react-router-dom";
class PrTableRow extends Component {
  state = {
    accountBalance: 1000000,
  };

  render() {
    return (
      <tr>
        <th scope="row">{this.props.obj.reqNo}</th>
        <td>{this.props.obj.location}</td>
        <td>Supun perera</td>
        <td>Rs {this.props.obj.total}</td>
        <td>
          {this.state.accountBalance > this.props.obj.total ? "Yes" : "No"}
          <button
            id="ammndbtonn"
            type="button"
            className="btn btn-success mx-1"
            onClick={() => this.props.Ammendbttonpress(this.props.obj.doocid)}
          >
            Ammend
          </button>
        </td>
        <td>
          <Link to={"/editPrManagementAndQuatation/" + this.props.obj.reqNo}>
            <i
              id="aroow"
              class="fa fa-arrow-right cusarrow"
              aria-hidden="true"
            ></i>
          </Link>
        </td>
      </tr>
    );
  }
}

export default PrTableRow;

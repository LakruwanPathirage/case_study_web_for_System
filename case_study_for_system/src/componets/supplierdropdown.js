import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class SupplierDropdown extends Component {
  render() {
    return (
      <select
        required
        className="form-control"
        value={this.props.Suppname}
        onChange={e => this.props.supplierCategoryChangedhandler(e)}
      >
        {this.props.supplierss &&
          this.props.supplierss.map(function (single) {
            return (
              <option key={single.suplierId} value={single.supname}>
                {single.supname}
              </option>
            );
          })}
      </select>
    );
  }
}

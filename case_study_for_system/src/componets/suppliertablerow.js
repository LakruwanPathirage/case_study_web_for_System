import React, { Component } from "react";
import "../css/custom.css";
import { db, auth } from "../services/firebase";
import { Link } from "react-router-dom";

class SupplierTableRow extends Component {
  state = {
    supllierwiseproducts: [],
  };

  hello = () => {
    var jj = this.props.obj;
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
          orderr.push(data);
        });

        this.setState({ supllierwiseproducts: orderr }, function () {
          console.log(this.state.supllierwiseproducts);
        });
      })
      .catch(error => console.log(error));

    console.log(this.state.supllierwiseproducts);
  };

  componentDidMount() {
    this.hello();
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.obj.id}</th>
        {/* {console.log(this.props.obj.data())} */}
        <td>{this.state.supllierwiseproducts.length}</td>

        <td>
          <Link to={"/editquations/" + this.props.obj.id}>
            <i class="fa fa-arrow-right cusarrow" aria-hidden="true"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

export default SupplierTableRow;

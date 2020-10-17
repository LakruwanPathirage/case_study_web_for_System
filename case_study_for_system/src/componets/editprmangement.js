import React, { Component } from "react";
import { db, auth } from "../services/firebase";

var ids = require("short-id");
export default class EditPrManagement extends Component {
  state = {
    suppliers: [],
    suppliername: null,
    selectedsuppliers: [],
    requisitionId: "",
    mangername: "Supun perera",
    sitename: "",
    amount: "",
    pagereqruision: [],
    documntId: "",
  };

  componentDidMount() {
    // console.log("heyyyyyyy--------    " + ids.generate());
    var reqno = this.props.match.params.id;

    db.collection("requisitions")
      .where("reqNo", "==", reqno)
      .get()
      .then(snapshot => {
        // const requisitionsss = [];

        snapshot.forEach(docc => {
          console.log(docc.id, " => ", docc.data());

          this.setState(
            {
              pagereqruision: docc.data(),
              sitename: docc.data().location,
              requisitionId: docc.data().reqNo,
              amount: docc.data().total,
              documntId: docc.id,
            },
            function () {
              console.log(this.state.pagereqruision);
            }
          );
        });

        // this.setState({ requisitions: requisitions });
        // console.log("this is " + requisitionsss[0]);
      })
      .catch(error => console.log(error));

    db.collection("supplierdetails")
      .where("approved", "==", true)
      .get()
      .then(snapshot => {
        const suppliers = [];
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc);

          const data = doc.data();

          suppliers.push(data);
        });

        this.setState({
          suppliers: suppliers,
          suppliername: suppliers[1].supname,
        });
        console.log("I am all suppliers" + suppliers);
      })
      .catch(error => console.log(error));

    // this.setState({ suppliername: e.target.value }, function () {
    //   console.log(this.state.suppliername);
    // });
  }

  supplierCategoryChangedhandler = e => {
    if (e.target.value == null) {
      return;
    }
    this.setState({ suppliername: e.target.value }, function () {
      console.log(this.state.suppliername);
    });
  };

  //remove supplier from list
  removesupplier = suppliernnme => {
    console.log("delete clicked");
    const FilterTodo = this.state.selectedsuppliers.filter(
      single => single !== suppliernnme
    );
    this.setState({
      selectedsuppliers: FilterTodo,
    });
  };

  //add supplier to list
  AddSuplierToList = e => {
    e.preventDefault();
    if (this.state.suppliername == null) {
      return;
    }

    console.log("add suplier button clicked " + this.state.suppliername);

    const FilterTodo = this.state.selectedsuppliers.filter(
      todo => todo == this.state.suppliername
    );
    console.log("I am already selected and length is" + FilterTodo.length);
    if (FilterTodo.length == 0) {
      let addsupplier = [];
      addsupplier.push(this.state.suppliername);
      addsupplier = [addsupplier, ...this.state.selectedsuppliers];

      this.setState({ selectedsuppliers: addsupplier }, function () {
        console.log(this.state.selectedsuppliers);
      });
    }
  };

  //table row printing
  preditproductstablerow = () => {
    return this.state.pagereqruision.products.map(function (singleproduct, i) {
      return (
        <tr key={i}>
          <th scope="row">{i}</th>
          <td>{singleproduct.desc}</td>
          <td>{singleproduct.qty}</td>
        </tr>
      );
    });
  };

  //send button clicked
  sendbutton = suppliernnme => {
    let selectedsup = this.state.selectedsuppliers;
    let rrnumber = this.state.requisitionId; //get requestion id
    let allsupliers = this.state.suppliers;
    let prodgenaratedid = ids.generate();
    let accessprops = this.props;
    let nowproducts = this.state.pagereqruision.products;
    // let foundsupll = {};
    console.log("send btn clicked");
    db.collection("requisitions")
      .doc(this.state.documntId)
      .update({
        status: "Approved",
      })
      .then(function () {
        console.log("Document successfully updated!");

        let supplierstocalled =
          Math.floor(Math.random() * selectedsup.length) + 1;

        console.log(supplierstocalled);

        let places = [
          "Malabe",
          "Kolonnawa",
          "Kandy",
          "Jayawardenapura",
          "kottawa",
          "Gampaha",
          "colombo",
          "Kiribathgoda",
          "kotte",
          "Borella",
          "Jaffna",
          "Kurunagala",
          "Homagama",
          "Moratuwa",
        ];
        let dti = ["Yes", "No"];
        let nproducts = [];

        let suppliProdct = [];
        for (var i = 0; i < supplierstocalled; i++) {
          let myprodts = [];
          let supliname = selectedsup[i].toString();

          for (var x = 0; x < nowproducts.length; x++) {
            let prdtName = nowproducts[x].desc;
            let prtPrice = Math.floor(Math.random() * 18000) + 1;
            let prtQuantity = nowproducts[x].qty;
            nproducts.push({
              details: dti[Math.floor(Math.random() * 2)],
              requisition: {
                reqNo: rrnumber,
                location: places[Math.floor(Math.random() * 14)],
              },
              product: {
                code: prodgenaratedid,
                desc: prdtName,
                discount: "0",
                qty: prtQuantity,
                price: prtPrice,
              },
              supplier: {
                email: "dghh@gmail.com",
                phoneNo: "07445555",
                supplierName: supliname,
                supplierTerm: "general",
              },
            });
            console.log(
              "selectinh product are  productname " +
                prdtName +
                " prodct price " +
                prtPrice.toString() +
                " price is " +
                prtQuantity.toString()
            );
            myprodts.push({
              itemname: prdtName,
              price: prtPrice.toString(),
              quantity: prtQuantity.toString(),
            });
          }
          suppliProdct.push({ supplierName: supliname, products: myprodts });
        }
        // console.log(
        //   "these are the produts " +
        //     suppliProdct[0].supplierName +
        //     " and " +
        //     suppliProdct[0].products[0].itemname
        // );
        // console.log(suppliProdct[0].products);

        // for (var h = 0; h < suppliProdct.length; h++) {
        //   db.collection("suporderrss")
        //     .doc(rrnumber)
        //     .collection("suppliers")
        //     .doc(suppliProdct[h].supplierName)
        //     .set({
        //       products: suppliProdct[h].products,
        //     });
        //}

        for (var h = 0; h < suppliProdct.length; h++) {
          var yy = rrnumber;
          var suppname = suppliProdct[h].supplierName;
          console.log("req num is" + yy);
          console.log("supplier name is" + suppliProdct[h].supplierName);
          // console.log("products" + suppliProdct[h].products);
          db.collection("suporderrss").doc(yy).set({ name: "fbghh" });

          db.collection("suporderrss")
            .doc(yy)
            .collection("suppliers")
            .doc(suppliProdct[h].supplierName)
            .set({
              dummy: "dummy",
              products: [{ itemname: "vfbb", price: "555", quantity: "5555" }],
            });
        }
        // for (var k = 0; k < nproducts.length; k++) {
        //   db.collection("supplierQuotation").add(nproducts[k]);
        // }
        //   accessprops.history.push("/createPrManagementAndQuatations");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="card card-body">
          <form>
            <div className="row">
              <div className="col-md-5">
                <div class="form-group row">
                  <label for="prescridd" class="col-sm-5 col-form-label">
                    ID
                  </label>
                  <div class="col-sm-5">
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="prescridd"
                      value={this.state.requisitionId}
                      readonly
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="name" class="col-sm-5 col-form-label">
                    Name
                  </label>
                  <div class="col-sm-5">
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="name"
                      value={this.state.mangername}
                      readonly
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="manager" class="col-sm-5 col-form-label">
                    Manager
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="manager"
                      value={this.state.mangername}
                      readonly
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="site" class="col-sm-5 col-form-label">
                    Site
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="site"
                      value={this.state.sitename}
                      readonly
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="site" class="col-sm-5 col-form-label">
                    Amount
                  </label>
                  <div class="col-sm-5">
                    <input
                      type="amount"
                      className="form-control bg-secondary"
                      id="amount"
                      value={this.state.amount}
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-7">
                    <div className="form-group">
                      <label>Select Suppliers </label>
                      <select
                        required
                        className="form-control"
                        value={this.state.suppliername}
                        onChange={this.supplierCategoryChangedhandler}
                      >
                        {/* <option>Select supplier</option> */}
                        {this.state.suppliers &&
                          this.state.suppliers.map(function (single) {
                            return (
                              <option
                                key={single.supname}
                                value={single.supname}
                              >
                                {single.supname}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      class="btn btn-primary"
                      type="submit"
                      onClick={this.AddSuplierToList}
                    >
                      Select Supplier
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <ul className="list-group">
                      {this.state.selectedsuppliers.length ? (
                        this.state.selectedsuppliers.map(item => {
                          return (
                            <li className="list-group-item  d-flex justify-content-between my-1 custtm-supplierlist">
                              <p className="m-0 p-0">{item}</p>
                              <div>
                                <span
                                  className="mx-2 text-danger"
                                  onClick={() => this.removesupplier(item)}
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="list-group-item my-2 custtm-supplierlist list-group-item-warning">
                          No suppliers
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-md-12">
              <table class="table prequement">
                <thead class="thead-dark">
                  <tr>
                    <th>ITEM_ID</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pagereqruision.products &&
                    this.preditproductstablerow()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-2 offset-md-10 custombbtn offset-sm-0">
            <button
              type="button"
              class="btn btn-labeled btn-success p-2 "
              onClick={this.sendbutton}
            >
              Send
              <span class="btn-label ml-2">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import EditPrmanagemet from "../componets/editprmangement";
import Header from "../componets/header";
import Home from "../componets/Home";
import PrTableRow from "../componets/prtablerow";
import SupplierTableRow from "../componets/suppliertablerow";
Enzyme.configure({ adapter: new Adapter() });

describe("Recrusition Rejection button", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Header />)
        .find("#companylogo")
        .exists()
    ).toBe(true);
  });
});

test("when the ammnend button is pressed event is cancelled", () => {
  const wrapper = shallow(<PrTableRow />);
  let prevented = true;
  wrapper.find("button").simulate("click", {
    prevented: () => {
      prevented: false;
    },
  });
  expect(prevented).toBe(false);
});

describe("select suppliers from dropdown", () => {
  it("should respond to change event and change the state of the EditPrmanagemet  Component", () => {
    const wrapper = shallow(<EditPrmanagemet />);
    wrapper.find("#addsupplierstolist").simulate("change", {
      suppliername: "",
    });
    expect(wrapper.state("suppliername")).toEqual(e.target.value);
  });
});

describe("Home compoenet exist", () => {
  test("renders", () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.exists()).toBe(true);
  });
});

//baneername

describe("Banner name displlay", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Header />)
        .find("#baneername")
        .exists()
    ).toBe(true);
  });
});

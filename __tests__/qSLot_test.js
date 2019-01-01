import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QSlot from "../src/qSlot";
import { by } from "../src/helper";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header> Heelo </header>;
const Test = props => (
  <div>
    hello
    <QSlot select={by("slot")} to={Header} content={props.children} />
  </div>
);
test("Test component should return correct output", () => {
  const wrapper = shallow(
    <Test>
      <div slot />
    </Test>
  );
  expect(wrapper.html()).toEqual(
    "<div>hello<div><header> Heelo </header></div></div>"
  );
});

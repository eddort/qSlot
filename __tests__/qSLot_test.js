import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QSlot from "../src/QSlot";
import { by } from "../src/helper";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header>Test</header>;

test("Test component should return correct output", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={by("slot")} to={Header} content={props.children} />
    </div>
  );
  const wrapper = shallow(
    <Test>
      <div slot />
      <div slot />
    </Test>
  );
  expect(wrapper.html()).toEqual(
    "<div>hello<div><header>Test</header><header>Test</header></div></div>"
  );
});

test("Substitution works once", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={by("slot")} to={Header} content={props.children} once />
    </div>
  );
  const wrapper = shallow(
    <Test>
      <div slot />
      <div slot />
      <div slot />
      <div slot />
      <div slot />
    </Test>
  );
  expect(wrapper.html()).toEqual(
    "<div>hello<div><header>Test</header></div></div>"
  );
});

test("Without children", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={by("slot")} to={Header} content={props.children} />
    </div>
  );
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

test("Without children and with once prop", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={by("slot")} to={Header} content={props.children} once />
    </div>
  );
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

// test("Substitution works once", () => {
//   const Test = props => (
//     <div>
//       <QSlot
//         select={by("slot")}
//         to={Header}
//         content={props.children}
//         once
//         param={"1"}
//       />
//     </div>
//   );
//   const wrapper = shallow(
//     <Test>
//       <div slot param="2" />
//     </Test>
//   );
//   console.log(wrapper.find(Header), '!!!!!')
//   expect(wrapper.find(Header).props().param).to.equal("2");
// });

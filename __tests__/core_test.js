import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PropTypes } from "prop-types";
import { QSlot, byProps } from "../src/index";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header>Test</header>;

test("Test component should return correct output", () => {
  const Test = props => (
    <div>
      hello
      <QSlot
        select={byProps("slot", true)}
        to={Header}
        content={props.children}
      />
    </div>
  );

  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
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
      <QSlot
        select={byProps("slot", true)}
        to={Header}
        content={props.children}
        once
      />
    </div>
  );
  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
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
      <QSlot
        select={byProps("slot", true)}
        to={Header}
        content={props.children}
      />
    </div>
  );
  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

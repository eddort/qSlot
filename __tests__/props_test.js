import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PropTypes } from "prop-types";
import { QSlot, byProps, byType, systemProps } from "../src/index";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header>Test</header>;

test("System props must be removed", () => {
  const Test = props => (
    <div>
      <QSlot
        select={byType("Header")}
        to={Header}
        content={props.children}
        once
        slotParam="2"
      />
    </div>
  );
  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
  const wrapper = mount(
    <Test>
      <Header param="2" />
    </Test>
  );
  systemProps.forEach(sysProp =>
    expect(wrapper.find("Header").prop(sysProp)).toEqual(undefined)
  );
});

test("Assign props without default", () => {
  const H = props => <div {...props} />;
  const Test = props => (
    <div>
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
  const wrapper = mount(
    <Test>
      <H slot param="2" />
    </Test>
  );
  expect(wrapper.find("Header").prop("param")).toEqual("2");
});

test("Assign props", () => {
  const H = props => <div {...props} />;
  const Test = props => (
    <div>
      <QSlot
        select={byProps("slot", true)}
        to={Header}
        content={props.children}
        once
        param="1"
      />
    </div>
  );
  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
  const wrapper = mount(
    <Test>
      <H slot param="2" param2="22" />
    </Test>
  );
  expect(wrapper.find("Header").prop("param")).toEqual("1");
  expect(wrapper.find("Header").prop("param2")).toEqual("22");
});

test("Without children and with once prop", () => {
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
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

test("Assign props without collision", () => {
  const H = props => <div {...props} />;
  const Test = props => (
    <div>
      <QSlot
        select={byProps("slot", true)}
        to={Header}
        content={props.children}
        once
        param="1"
      />
    </div>
  );
  Test.propTypes = {
    children: PropTypes.node
  };
  Test.defaultProps = {
    children: ""
  };
  const wrapper = mount(
    <Test>
      <H slot param="2" param2="22" to="test" />
    </Test>
  );
  expect(wrapper.find("Header").prop("param")).toEqual("1");
  expect(wrapper.find("Header").prop("to")).toEqual("test");
});

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PropTypes } from "prop-types";
import { QSlot, byType, without } from "../src/index";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header>Test</header>;

test("Replace by type", () => {
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
  expect(wrapper.find("Header").prop("param")).toEqual("2");
  expect(wrapper.find("Header").prop("slotParam")).toEqual("2");
});

test("'without' selector", () => {
  const H = props => <div {...props}>{props.children}</div>;
  H.propTypes = {
    children: PropTypes.node
  };
  H.defaultProps = {
    children: ""
  };
  const Test = props => (
    <div>
      <QSlot select={without("Header")} to={H} content={props.children} once />
      <span>
        <QSlot
          select={byType("Header")}
          to={Header}
          content={props.children}
          once
        />
      </span>
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
      <div>HELLO</div>
    </Test>
  );
  expect(wrapper.html()).toEqual(
    "<div><div><div>HELLO</div></div><span><div><header>Test</header></div></span></div>"
  );
});

test("assign component", () => {
  const Test = props => (
    <div>
      <QSlot select={byType("Header")} content={props.children} once />
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
      <div>HELLO</div>
    </Test>
  );
  expect(wrapper.html()).toEqual("<div><div><header>Test</header></div></div>");
});

test("pick by index", () => {
  const H = props => <div {...props}>{props.children}</div>;
  H.propTypes = {
    children: PropTypes.node
  };
  H.defaultProps = {
    children: ""
  };
  const Test = props => (
    <div>
      <QSlot select={byType("H")} content={props.children} once slotIndex={0} />
      <QSlot select={byType("H")} content={props.children} once slotIndex={2} />
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
      <H param="2">one</H>
      <H param="2">two</H>
      <H param="2">three</H>
    </Test>
  );
  expect(wrapper.html()).toEqual(
    '<div><div><div param="2">one</div></div><div><div param="2">three</div></div></div>'
  );
});

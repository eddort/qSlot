import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QSlot from "../src/QSlot";
import { byProps, byType } from "../src/helper";

Enzyme.configure({ adapter: new Adapter() });
const Header = () => <header>Test</header>;

test("Test component should return correct output", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={byProps("props.slot")} to={Header} content={props.children} />
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
      <QSlot select={byProps("props.slot")} to={Header} content={props.children} once />
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
      <QSlot select={byProps("props.slot")} to={Header} content={props.children} />
    </div>
  );
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

test("Without children and with once prop", () => {
  const Test = props => (
    <div>
      hello
      <QSlot select={byProps("props.slot")} to={Header} content={props.children} once />
    </div>
  );
  const wrapper = shallow(<Test />);
  expect(wrapper.html()).toEqual("<div>hello<div></div></div>");
});

test("Assign props", () => {
  const H = props => <div {...props} />;
  const Test = props => (
    <div>
      <QSlot
        select={byProps("props.slot")}
        to={Header}
        content={props.children}
        once
        param="1"
      />
    </div>
  );
  const wrapper = mount(
    <Test>
      <H slot param="2" param2="22" />
    </Test>
  );
  expect(wrapper.find('Header').prop('param')).toEqual("1");
  expect(wrapper.find('Header').prop('param2')).toEqual("22");
});

test("Assign props without default", () => {
  const H = props => <div {...props} />;
  const Test = props => (
    <div>
      <QSlot
        select={byProps("props.slot")}
        to={Header}
        content={props.children}
        once
      />
    </div>
  );
  const wrapper = mount(
    <Test>
      <H slot param="2" />
    </Test>
  )
  expect(wrapper.find('Header').prop('param')).toEqual("2");
});

test("Replace by type", () => {
  const H = props => <div {...props} />;
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
  const wrapper = mount(
    <Test>
      <Header slotType="Header" param="2" />
    </Test>
  )
  expect(wrapper.find('Header').prop('param')).toEqual("2");
  expect(wrapper.find('Header').prop('slotParam')).toEqual("2");
});

// удаление лишних аттрибутов
// при обходе помечать уже вставленные ноды
// обработка не переданных параметров

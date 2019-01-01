import React from "react";
import { PropTypes } from "prop-types";
import { getAvailElement } from "./helper";

class qSlot extends React.Component {
  render() {
    const { content, select, once = false, el } = this.props;
    const El = getAvailElement(el);
    const nodes = select(content, once)
    return <El {...this.props}>{nodes}</El>;
  }
}

qSlot.propTypes = {
  content: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  el: PropTypes.string,
  once: PropTypes.bool,
  children: PropTypes.node,
  to: PropTypes.node.isRequired
};

qSlot.defaultProps = { once: false, el: "div", children: "" };

export default qSlot;

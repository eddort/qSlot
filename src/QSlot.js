import React from "react";
import { PropTypes } from "prop-types";
import { getAvailElement, replace, removeSystemProps } from "./helper";

class QSlot extends React.Component {
  render() {
    const { content, select, once = false, el, to, slotIndex } = this.props;
    const El = getAvailElement(el);
    const nodes = select(content, once, slotIndex);
    const availProps = removeSystemProps(this.props);
    return replace(nodes, to, availProps, El, once);
  }
}

QSlot.propTypes = {
  content: PropTypes.node,
  select: PropTypes.func.isRequired,
  el: PropTypes.string,
  once: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  slotIndex: PropTypes.number
};

QSlot.defaultProps = {
  once: false,
  el: "div",
  content: undefined,
  to: "",
  slotIndex: undefined
};

export default QSlot;

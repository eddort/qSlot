import React from "react";
import { PropTypes } from "prop-types";
import { getAvailElement, replace } from "./helper";

class QSlot extends React.Component {
  render() {
    const { content, select, once = false, el, to } = this.props;
    const El = getAvailElement(el);
    const nodes = select(content, once);
    return replace(nodes, to, this.props, El, once);
  }
}

QSlot.propTypes = {
  content: PropTypes.node,
  select: PropTypes.func.isRequired,
  el: PropTypes.string,
  once: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};

QSlot.defaultProps = { once: false, el: "div", content: undefined };

export default QSlot;

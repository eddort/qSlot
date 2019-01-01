import React from "react";
import { PropTypes } from "prop-types";
import { getAvailElement, replace } from "./helper";

class qSlot extends React.Component {
  render() {
    const { content, select, once = false, el, to } = this.props;
    const El = getAvailElement(el);
    const nodes = select(content, once);
    return replace(nodes, to, this.props, El, once);
  }
}

qSlot.propTypes = {
  content: PropTypes.node.isRequired,
  select: PropTypes.func.isRequired,
  el: PropTypes.string,
  once: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};

qSlot.defaultProps = { once: false, el: "div" };

export default qSlot;

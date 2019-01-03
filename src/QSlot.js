import React from "react";
import { PropTypes } from "prop-types";
import { getAvailElement, replace } from "./helper";

class QSlot extends React.Component {
  render() {
    const { content, select, once = false, el, to, slotIndex } = this.props;
    const El = getAvailElement(el);
    let nodes;
    if (select instanceof Array) {
      const len = select.length - 1;
      nodes = select.reduce((acc, fn, i) => {
        // call 'pick' after all 'select'
        let _once = false;
        let _slotIndex;
        if (len === i) {
          _once = once;
          _slotIndex = slotIndex;
        }
        // eslint-disable-next-line
        acc = fn(acc, _once, _slotIndex);
        return acc;
      }, content);
    } else {
      nodes = select(content, once, slotIndex);
    }
    return replace(nodes, to, this.props, El, once);
  }
}

QSlot.propTypes = {
  content: PropTypes.node,
  select: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
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
  slotIndex: undefined,
  select: () => {}
};

export default QSlot;

import React from "react";
import get from "lodash.get";

export const availElements = ["div", "span"];

export const getAvailElement = (el = "div") =>
  availElements.includes(el) ? el : "div";

export const findByKey = ({ key, value = true }, content, once = false) => {
  const nodes = React.Children.toArray(content).filter(
    node => get(node, key) === value
  );
  if (nodes.length && once) {
    return [nodes[0]];
  }
  return nodes;
};

export const byProps = key => findByKey.bind(null, { key });

export const byType = value =>
  findByKey.bind(null, { key: "props.slotType", value });

export const prefixKey = key => `0:${key}`;

export const replace = (nodes, To, slotProps, Wrapper) => {
  const unwrapped = nodes.map((node, i) => (
    <To key={prefixKey(i)} {...node.props} {...slotProps} />
  ));
  return <Wrapper>{unwrapped}</Wrapper>;
};

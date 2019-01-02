import React from "react";
import get from "lodash.get";

export const availElements = ["div", "span"];

export const getAvailElement = (el = "div") =>
  availElements.includes(el) ? el : "div";

export const systemProps = [
  "el",
  "once",
  "_slotIsTouched",
  "select",
  "content",
  "to",
  "slotType",
  "slotIndex"
];

export const removeSystemProps = props => {
  const availProps = { ...props };
  systemProps.forEach(prop => delete availProps[prop]);
  return availProps;
};
export const findByKey = (
  { key, value = true, without = false },
  content,
  once = false,
  slotIndex = null
) => {
  const nodes = React.Children.toArray(content).filter((node, i) => {
    let isFound;
    if (without) {
      isFound = !get(node, key) || get(node, key) !== value;
    } else {
      isFound = get(node, key) === value;
    }
    return isFound;
  });
  if (nodes.length && once && slotIndex === null) {
    return [nodes[0]];
  } else if (nodes.length && once && slotIndex >= 0 && nodes[slotIndex]) {
    return [nodes[slotIndex]];
  } else if (nodes.length && once && slotIndex >= 0 && !nodes[slotIndex]) {
    return [];
  }
  return nodes;
};

export const byProps = key => findByKey.bind(null, { key });

export const byType = value =>
  findByKey.bind(null, { key: "props.slotType", value });

export const without = value =>
  findByKey.bind(null, { key: "props.slotType", value, without: true });

export const prefixKey = key => `0:${key}`;

export const replace = (nodes, To, slotProps, Wrapper) => {
  const unwrapped = nodes.map((node, i) => {
    if (To) {
      return <To key={prefixKey(i)} {...mergeProps(node.props, slotProps)} />;
    }
    return { ...node, ...mergeProps(node.props, slotProps) };
  });
  return <Wrapper>{unwrapped}</Wrapper>;
};

export const mergeProps = (nProps, sProps) => {
  const nodeProps = removeSystemProps(Object.assign({}, nProps));
  const slotProps = removeSystemProps(Object.assign({}, sProps));
  const className =
    typeof slotProps.className === "string"
      ? slotProps.className.split(" ")
      : slotProps.className;
  delete slotProps.className;

  if (nodeProps.className || className) {
    nodeProps.className = []
      .concat(
        typeof nodeProps.className === "string"
          ? nodeProps.className.split(" ")
          : nodeProps.className
      )
      .concat(className)
      .filter(Boolean)
      .reduce((a, b) => (a.indexOf(b) < 0 ? a.concat(b) : a), [])
      .join(" ");
  }
  return Object.assign({}, nodeProps, slotProps);
};

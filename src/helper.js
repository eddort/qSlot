import React from "react";

export const availElements = ["div", "span"];

export const getAvailElement = (el = "div") =>
  availElements.includes(el) ? el : "div";

export const findByKey = (key, content, once = false) => {
  const nodes = React.Children.toArray(content).filter(node => {
    const props = node.props || {};
    return props[key] === true;
  });

  return once ? nodes[0] : nodes;
};

export const by = key => findByKey.bind(null, key);

export const prefixKey = key => `0:${key}`

export const replace = (nodes, To, slotProps, Wrapper) => {
  const unwrapped = nodes.map((node, i) => <To key={prefixKey(i)} {...node.props} {...slotProps} />);
  return (
    <Wrapper>
      {unwrapped}
    </Wrapper>
  );
};

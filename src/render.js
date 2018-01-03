import React from "react";
const REACT_ELEMENT = Symbol.for("react.element");

const EMPTY_ARRAY = [];

const isFlattenable = value => {
  const type = typeof value;
  return type === "string" || type === "number";
};

const flatten = array => {
  if (array.every(isFlattenable)) {
    return array.join("");
  }
  return array;
};

const toTemplate = string => {
  const expressionRE = /{{\w+}}/g;
  const match = string.match(expressionRE) || EMPTY_ARRAY;
  return [string.split(expressionRE), ...match];
};

const normalizeValue = (value, key) => {
  if (value == null || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (value.$$typeof === REACT_ELEMENT) {
    return React.cloneElement(value, { key });
  }
};

const render = (string, values) => {
  const [parts, ...expressions] = toTemplate(string);
  return flatten(
    parts.reduce((acc, item, index, array) => {
      if (index === array.length - 1) {
        return [...acc, item];
      }
      const match = expressions[index] && expressions[index].match(/{{(\w+)}}/);
      const value = match != null ? values[match[1]] : null;
      return [...acc, item, normalizeValue(value, index)];
    }, [])
  );
};

export default render;

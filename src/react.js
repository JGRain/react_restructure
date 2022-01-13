import Component from './Component';
export const reactFragement = 'react.fragement'; //Symbol('react.fragement')
/**
 *
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children 第一个儿子
 */
function createElement(type, config, children) {
  let ref;
  if (config) {
    delete config._owner;
    delete config._store;
    ref = config.ref;
    delete config.ref;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  // children 可能是一个数组（多余一个儿子），可以能是一个字符串或者数字，也可能是一个null，也可能是一个react元素
  props.children = children;
  return {
    type,
    props,
    ref,
  };
}
function createRef() {
  return {
    current: null,
  };
}

function createContext() {
  let currentValue;
  function Provider({ value, children }) {
    currentValue.value = value;
    return children;
  }
  function Consumer({ children }) {
    return children(currentValue.value);
  }
  return {
    Provider,
    Consumer,
  };
}
/**
 *
 * @param {*} element
 * @param {*} props
 * @param {*} children
 */
function cloneElement(element, props, children) {
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return {
    ...element,
    props,
  };
}

let React = {
  createElement,
  Component,
  createRef,
  createContext,
  cloneElement,
};
export default React;

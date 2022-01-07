import { addEvent } from './event';
/**
 * 虚拟DOM转换成真实DOM并插入到容器里
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}
/**
 * 把虚拟DOM转换成真实DOM
 * @param {*} vdom null 数字 字符串 React元素
 */
export function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  if (!vdom) {
    return '';
  }
  // 否则就是一个React元素
  let { type, props, ref } = vdom;
  let dom;
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 说明这个土培是一个类组件
      return updateClassComponent(vdom);
    } else {
      return updateFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);
  }
  updateProps(dom, props); // 更新属性 把虚拟dom上属性设置到真实DOM上
  // 处理子节点
  if (typeof vdom.children === 'string' || typeof vdom.children === 'number') {
    dom.textContent = props.children;
    // 一个react元素
  } else if (typeof vdom.children === 'object' && typeof vdom.children.type) {
    render(vdom.children, dom);
    // 如果儿子是一个数组，说明是多个子节点
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : '';
  }
  if (ref) {
    ref.current = dom;
  }
  return dom;
}
/**
 * 得到真实DOM
 * 1、创建类组件的实例
 * 2、调用实例的render方法得到将要渲染的React元素
 * 3、把react元素转成真实DOM
 * @param {*} vdom 类组件的虚拟DOM元素
 */
function updateClassComponent(vdom) {
  let { type, props } = vdom;
  const classInstance = new type(props); // new Welcome({name:'zhufeng1'})
  let renderVdom = classInstance.render();
  const dom = createDOM(renderVdom);
  classInstance.dom = dom;
  return dom;
}
/**
 * 得到真实dom
 * @param {*} vdom 函数组件的虚拟dom react元素
 * vdom{type:Welcome, props:{name:'zhufeng'}}
 * renderVdom {type:'h1,props:{children}}
 */
function updateFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  return createDOM(renderVdom);
}
/**
 * 把子节点从虚拟DOM全部转换成真实DOM并插入到父节点去
 * @param {*} childrenVdom 子节点的虚拟DOM
 * @param {*} parentDOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => render(childVdom, parentDOM));
}
/**
 * 把属性对象中的属性设置到DOM元素上
 * @param {*} dom DOM元素
 * @param {*} newprops 属性对象
 */
function updateProps(dom, newprops) {
  for (let key in newprops) {
    if (key === 'children') {
      continue;
    }
    if (key === 'style') {
      let styleObj = newprops[key];
      for (let ikey in styleObj) {
        dom.style[ikey] = styleObj[ikey];
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newprops[key];
      addEvent(dom, key.toLocaleLowerCase(), newprops[key]);
    } else {
      dom[key] = newprops;
    }
  }
}

let ReactDom = { render };
export default ReactDom;

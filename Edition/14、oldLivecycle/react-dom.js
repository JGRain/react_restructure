import { addEvent } from './event';
/**
 * 虚拟DOM转换成真实DOM并插入到容器里
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom1, container) {
  const vdom = { dom: null, ...vdom1 };
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
  updateProps(dom, {}, props); // 更新属性 把虚拟dom上属性设置到真实DOM上
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
    // 让虚拟dom的dom属性指向此虚拟DOM创建出来的真实DOM
    vdom.dom = dom;
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
  vdom.classInstance = classInstance;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  let renderVdom1 = classInstance.render();
  const renderVdom = { ...renderVdom1 };
  // 通过虚拟DOM创建了一个真实DOM,
  const dom = createDOM(renderVdom);
  // 让这个类虚拟dom的dom属性和render方法返回的虚拟DOM的dom熟悉都指向真实DOM
  vdom.dom = renderVdom.dom = dom;
  // 让组件实例老的Vdom属性指向本次render出来的渲染
  classInstance.oldVdom = renderVdom;
  classInstance.dom = dom;
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }
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
 * @param {*} newProps 属性对象
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue;
    }
    if (key === 'style') {
      let styleObj = newProps[key];
      for (let ikey in styleObj) {
        dom.style[ikey] = styleObj[ikey];
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps;
    }
  }
}

/**
 * 找到老大虚拟DOM与新的虚拟DOM的差异，把相应的差异更新到真实DOM上
 * @param {*} parentDOM id#root
 * @param {*} oldVdom
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if (!oldVdom && !newVdom) {
    return null;
  } else if (oldVdom && !newVdom) {
    let currentDOM = oldVdom.dom;
    parentDOM.removeChild(currentDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnMount) {
      oldVdom.classInstance.componentWillUnMount();
    }
    return null;
  } else if (!oldVdom && newVdom) {
    // TODO
    let newDOM = createDOM(newVdom); //创建一个新的真实DOM挂载到父节点DOM上
    newVdom.dom = newDOM;
    if (nextDOM) {
      // 如果有下一个弟弟DOM的话，插入到弟弟前面
      parentDOM.insertBefore(nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
    return newVdom;
  } else if (oldVdom && newVdom) {
    // 新老节点都有值
    updateElement(oldVdom, newVdom);
    return newVdom;
  }
}
/**
 * DOM-DIFF时，react为了优化性能有一些假设条件
 * 1、不考虑跨层级移动情况
 * 进入深度比较
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateElement(oldVdom, newVdom) {
  let currentDOM = (newVdom.dom = oldVdom.dom); // 获取 老的真实DOM
  newVdom.classInstance = oldVdom.classInstance;
  if (typeof oldVdom.type === 'string') {
    // 原生DOM类型
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(
      { ...currentDOM },
      oldVdom.props.children,
      newVdom.props.children,
    );
  } else if (typeof oldVdom.type === 'function') {
    // 就是组件
    updateClassInstance(oldVdom, newVdom);
  }
}
/**
 *
 * @param {*} parentDOM 父的真实DOM
 * @param {*} oldVChildren 老的虚拟dom儿子们
 * @param {*} newVChildren 新的虚拟dom儿子们
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  if (
    (typeof oldVChildren === 'string' || typeof oldVChildren === 'number') &&
    (typeof newVChildren === 'string' || typeof newVChildren === 'number')
  ) {
    if (oldVChildren !== newVChildren) {
      parentDOM.textContent = newVChildren;
    }
    return;
  }
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  // 其实在DOM是有优化的，
  for (let i = 0; i < maxLength; i++) {
    // 找此虚拟DOM对应的真实DOM之后的存在的真实DOM
    let nextDOM = oldVChildren.find(
      (item, index) => index > i && item && item.dom,
    );
    compareTwoVdom(
      parentDOM,
      { ...oldVChildren[i] },
      { ...newVChildren[i] },
      nextDOM?.dom,
    );
  }
}
/**
 *
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateClassInstance(oldVdom, newVdom) {
  let classInstance = oldVdom.classInstance;
  // 当父组件更新时候，会让子组件更新
  if (classInstance?.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps();
  }
  classInstance?.updater?.emitUpdate(newVdom.props);
}

let ReactDom = { render };
export default ReactDom;

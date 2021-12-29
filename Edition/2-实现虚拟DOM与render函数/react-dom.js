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
function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  if (!vdom) {
    return '';
  }
  // 否则就是一个React元素
  let { type, props } = vdom;
  let dom = document.createElement(type);
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
  return dom;
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
 * @param {*} props 属性对象
 */
function updateProps(dom, props) {
  for (let key in props) {
    if (key === 'children') {
      continue;
    }
    if (key === 'style') {
      let styleObj = props[key];
      for (let ikey in styleObj) {
        dom.style[ikey] = styleObj[ikey];
      }
    } else {
      dom[key] = props;
    }
  }
}

let ReactDom = { render };
export default ReactDom;

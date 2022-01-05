import { createDOM } from './react-dom';
class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
  /**
   * 同步更新逻辑
   * @param {*} partialState 新的部分状态
   */
  setState(partialState) {
    this.state = { ...this.satte, ...partialState }; // 合并状态
    let renderVdom = this.render(); // 重新调用render方法得新的虚拟DOM
    updateClassInstance(this, renderVdom);
  }
}
function updateClassInstance(classInstance, newVdom) {
  let oldDOM = classInstance.dom;
  let newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;

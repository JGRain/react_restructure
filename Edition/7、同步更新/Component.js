import { createDOM } from './react-dom';
import { isFunction } from './utils';
export let updateQueue = {
  updaters: [],
  isBatchingUpdate: false, // 标志 是否处于批量更新
  add(updater) {
    this.updaters.push(updater);
  },
  //强制批量更新
  betchUpdate() {
    this.updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false;
  },
};
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // 类组件的实例
    this.pendingStates = []; // 等待更新的状态
  }
  addState(partialState) {
    // 先把这个分状态添加到pendingStates数组中去
    this.pendingStates.push(partialState);
    //
    updateQueue.isBatchingUpdate
      ? updateQueue.add(this)
      : this.updateComponent();
  }
  // 同步更新组件 用pendingStates更新this.state
  updateComponent() {
    let { classInstance, pendingStates } = this;
    // 有等待更新的状态
    if (pendingStates.length > 0) {
      // 让组件的老状态和数组中的新状态进行合并，得到最后的新状态
      classInstance.state = this.getState();
      classInstance.forceUpdate();
    }
  }
  /**
   * 根据老状态和等待的新状态，得到最后的状态
   * @returns
   */
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance; // Counter.state
    // 有等待更新的状态
    if (pendingStates.length > 0) {
      pendingStates.forEach(nexState => {
        // 如果是函数的话
        if (isFunction(nexState)) {
          nexState = nexState(state);
        }
        state = { ...state, ...nexState }; // 用新状态覆盖老状态
      });
      pendingStates.length = 0;
    }
    return state;
  }
}
class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    // 为每一个组件配一个Updater类的实例
    this.updater = new Updater(this);
  }
  /**
   * 同步更新逻辑
   * @param {*} partialState 新的部分状态
   */
  setState(partialState) {
    debugger;
    this.updater.addState(partialState);
  }
  forceUpdate() {
    let renderVdom = this.render();
    updateClassComponent(this, renderVdom);
  }
}
function updateClassComponent(classInstance, newVdom) {
  let oldDOM = classInstance.dom;
  let newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;

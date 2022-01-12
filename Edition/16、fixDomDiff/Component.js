import { compareTwoVdom } from './react-dom';
import { isFunction } from './utils';
export let updateQueue = {
  updaters: new Set(),
  isBatchingUpdate: true, // 标志 是否处于批量更新
  add(updater) {
    this.updaters.add(updater);
  },
  //强制批量更新
  betchUpdate() {
    this.updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false;
    this.updaters.clear();
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
    this.emitUpdate(); // 发射更新 不需要传
  }

  // 当属性或者状态变更后都会走emitUpdate
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    // 如果有新的属性拿到了，或者现在处于非批量更新模式，直接更新
    console.log('emitUpdate', updateQueue.isBatchingUpdate);
    this.nextProps || !updateQueue.isBatchingUpdate
      ? this.updateComponent()
      : updateQueue.add(this);
  }

  // 同步更新组件 用pendingStates更新this.state
  updateComponent() {
    let { classInstance, pendingStates, nextProps } = this;
    // 有等待更新的状态
    if (nextProps || pendingStates.length > 0) {
      // 让组件的老状态和数组中的新状态进行合并，得到最后的新状态
      // 无论是否真正更新页面，组件state其实已经在getState时候更新了
      shouldUpdate(classInstance, nextProps, this.getState());
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

/**
 *
 * @param {*} classInstance
 * @param {*} nextState
 */
function shouldUpdate(classInstance, nextProps, nextState) {
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = nextState; // 不管是否刷新页面，状态一定会改
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(classInstance.props, nextState)
  ) {
    // 如果提够了shouldComponentUpdate,并且其执行后返回值为false,就更新结束
    return;
  }
  classInstance.forceUpdate();
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
    this.updater.addState(partialState);
  }
  forceUpdate() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    if (this.ownVdom.type.getDerivedStateFromProps) {
      let newState = this.ownVdom.type.getDerivedStateFromProps(
        this.props,
        this.state,
      );
      if (newState) {
        this.state = newState;
      }
    }
    let newVdom = this.render();
    newVdom = { ...newVdom };
      let extraArgs =
        this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate（
    // oldVdom 就是类的实例的Render方法渲染得到的那个虚拟DOM，或者说React元素div
    let currentVdom = compareTwoVdom(
      this.oldVdom.dom.parentNode,
      this.oldVdom,
      newVdom,
    );
    // 每次更新后，最新的Vdom会成为最新的上一次Vdon，等待下一次的更新比较
    this.oldVdom = currentVdom;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props,this.state,extraArgs);
    }
    // updateClassComponent(this, renderVdom);
  }
}
// function updateClassComponent(classInstance, newVdom) {
//   let oldDOM = classInstance.dom;
//   let newDOM = createDOM(newVdom);
//   oldDOM.parentNode.replaceChild(newDOM, oldDOM);
//   if (classInstance.componentDidUpdate) {
//     classInstance.componentDidUpdate();
//   }
//   classInstance.dom = newDOM;
// }

export default Component;

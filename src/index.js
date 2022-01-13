import React from './react';
import ReactDOM from './react-dom';

/**
 * Fragment 是什么，以及它如何实现
 * 遇到组件返回组件，组件又返回组件
 */
function Parent() {
  return <Child />;
}
function Child() {
  return <Grand />;
}
function Grand() {
  return <DoubleGrand />;
}
class DoubleGrand extends React.Component {
  return() {
    return <h1>DoubleGrand</h1>;
  }
}

// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<Parent />, document.getElementById('root'));

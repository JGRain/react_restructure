import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 高阶组件 他是一个函数
 * 属性代理 给老组件增加额外的属性
 */
const Loading = message => OldComponent => {
  return class extends React.Component {
    render() {
      const extraProps = {
        hide: () => {
          let loading = document.getElementById('loading');
          if (loading) {
            loading.style.display = 'none';
          }
        },
        show: () => {
          let loading = document.getElementById('loading');
          if (loading) {
            loading.style.display = 'block';
          } else {
            let div = document.createElement('div');
            div.innerHTML = `<p id="loading" style="position:absolute;top:100px;left:50%;width:100px;z-index:10;background-color:gray;color:red">${message}</p>`;
            document.body.appendChild(div);
          }
        },
      };
      return <OldComponent {...this.props} {...extraProps} />;
    }
  };
};
class Hellow extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        <button onClick={this.props.hide}>隐藏</button>
        <button onClick={this.props.show}>显示</button>
      </div>
    );
  }
}
let LoadingHello = Loading('加载中。。。')(Hellow);
// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(
  <LoadingHello title="title" />,
  document.getElementById('root'),
);

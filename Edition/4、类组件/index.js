import React from './react';
import ReactDOM from './react-dom';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>hello, {this.props.name}</h1>;
  }
}
let element = <Welcome name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));

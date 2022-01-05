import React from './react';
import ReactDOM from './react-dom';

function Welcome(props) {
  return <h1>hello, {props.name}</h1>;
}
// function greeting(name) {
//   if (name) {
//     return <h1>hello{name}</h1>;
//   } else {
//     return <h1>hellow world</h1>;
//   }
// }
let element = <Welcome name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));

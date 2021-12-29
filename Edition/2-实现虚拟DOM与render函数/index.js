import React from './react';
import ReactDOM from './react-dom';

// let title = 'hellow';
// let element = (
//   <h1 className={title} style={{ color: 'red' }} htmlFor="username">
//     {title}
//   </h1>
// );
function greeting(name) {
  if (name) {
    return <h1>hello{name}</h1>;
  } else {
    return <h1>hellow world</h1>;
  }
}
let element = greeting('my');
ReactDOM.render(element, document.getElementById('root'));

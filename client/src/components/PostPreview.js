import React from 'react';

const child = props => <li key={props._id}>{props.text}</li>;

export default props => (
  <li key={props._id}>
    <h1>{props.title}</h1>
    <p>{props.text}</p>
    <ul>{props._children.map(child)}</ul>
    
  </li>
);

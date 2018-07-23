import React from 'react';

function Square(props) {
  return (
    <button type="button" className={`square ${props.highlight}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;

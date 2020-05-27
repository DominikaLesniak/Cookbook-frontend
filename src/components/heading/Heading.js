import React from 'react';
import './Heading.css';

export function Heading(props) {
    return (
      <h1 className="page-heading">
        {props.title}
        <em>{props.text}</em>
      </h1>
    );
  }
  
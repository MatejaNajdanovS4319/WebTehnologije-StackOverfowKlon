import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className='card'>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
      <Link to={props.link} className="btn btn-danger">{props.buttonText}</Link>
    </div>
  );
};

export default Card;

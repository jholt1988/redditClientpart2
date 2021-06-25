import React from "react";

export const Card = (props) => {
  return <div className={`card ${props.className}`}>props.children</div>;
};

export default Card;

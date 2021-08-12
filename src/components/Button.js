import "components/Button.scss";

import React from "react";
const classNames = require('classnames/bind');

export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
      // "button--onClick": props.onClick,
      // "button--disabled": props.disabled
   });

   return <button
      className={buttonClass}
      // confirm={props.confirm}
      // danger={props.danger}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
   </button>;
}

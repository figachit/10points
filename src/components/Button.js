import React from 'react';

const Button = ({ children, action, active = true }) => {
  const classname = ['menu__button', 'material-icons', active ? '' : 'material-icons--inactive'].join(' ');
  return (
    <div className={ classname } onClick={ action }>{ children }</div>
  )
}

export default Button;

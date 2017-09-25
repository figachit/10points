import React from 'react';

const Header = ({ scores, handleTouch, showToolbar, getRef }) => {
  const [red, blue] = scores.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0,0]);
  const winner = red === blue ? 'DRAW' : red > blue ? 'RED' : 'BLUE';
  const show = scores.length ? 'show' : '';
  const classname = ['header', show].join(' ');

  return (
    <div className={classname}
      onMouseDown={(e) => handleTouch(e, { onHold: showToolbar, delay: 300 })}
      onTouchStart={(e) => handleTouch(e, { onHold: showToolbar, delay: 300 })}>
      <div className="header__total">{ red }</div>
      <div className="header__winner">{ winner }</div>
      <div className="header__total">{ blue }</div>
    </div>
  )
}

export default Header;

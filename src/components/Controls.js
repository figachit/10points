import React from 'react';

const Controls = ({ pointerDownHandler, redWin, blueWin, draw, red, blue, showtime }) => {
  const classname = ['controls', showtime ? 'controls--show' : ''].join(' ');
  return (
    <div className={classname}>
      <div className="before">
        <div className="before__button red--bg">KD</div>
        <div className="before__button blue--bg">KD</div>
      </div>
      <div className="buttons"
        onMouseDown={(e) => pointerDownHandler(e, { onSwipe: true })}
        onTouchStart={(e) => pointerDownHandler(e, { onSwipe: true })}>
        <div className="button button--win red" onClick={ redWin }>{ Math.min(red, 10) || 'RED' }</div>
        <div className="button button--draw" onClick={ draw }>DW</div>
        <div className="button button--win blue" onClick={ blueWin }>{ Math.min(blue, 10) || 'BLUE' }</div>
      </div>
    </div>
  )
}

export default Controls;

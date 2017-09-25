import React from 'react';

const Round = ({ red, blue, round, handleTouch, onSwipe, onHold }) => (
  // <div className="round" onMouseDown={handleTouch} onTouchStart={handleTouch}>
  <div className="round"
    onMouseDown={(e) => handleTouch(e, { onSwipe, onHold })}
    onTouchStart={(e) => handleTouch(e, { onSwipe, onHold })}>
    <div className="round__score">{ red }</div>
    <div className="round__number">{ round }</div>
    <div className="round__score">{ blue }</div>
  </div>
)

export default Round;

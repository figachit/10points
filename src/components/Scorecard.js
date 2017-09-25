import React from 'react';
import Round from './Round';

const Scorecard = ({ scores, getRef, handleTouch, onSwipe, onHold }) => (
  <div className="container" ref={(ref) => getRef(ref, 'score')}>
    <div className="scores" ref={(ref) => getRef(ref, 'scorecard')}>
      {
        scores.map(([red, blue], i) =>
          <Round
            handleTouch={handleTouch}
            onSwipe={onSwipe}
            onHold={onHold}
            red={red}
            blue={blue}
            round={i + 1}
            key={i}
          />
        )
      }
    </div>
  </div>
)

export default Scorecard;

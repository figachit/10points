import React from 'react';
import Hammer from 'react-hammerjs';

// const hammerOptions = {
//   recognizers: {
//     pan: {
//       time: 1500,
//       threshold: 0,
//       // direction: Hammer.DIRECTION_HORIZONTAL
//     }
//   }
// };

const Controls = ({ redWin, blueWin, draw, red, blue, handleSwipe }) => (
  <div className="scoring">
    <div className="before">
      <div className="before__button before__red">KD</div>
      <div className="before__button before__blue">KD</div>
    </div>
    <Hammer
      onPan={handleSwipe}
      direction={Hammer.DIRECTION_HORIZONTAL}
      options={{time: 1500, threshold: 0}}>
      <div className="buttons" >
        <div className="button button--win red" onClick={ redWin }>{ Math.min(red, 10) || 'RED' }</div>
        <div className="button button--draw" onClick={ draw }>DW</div>
        <div className="button button--win blue" onClick={ blueWin }>{ Math.min(blue, 10) || 'BLUE' }</div>
      </div>
    </Hammer>
  </div>
)

export default Controls;

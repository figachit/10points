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

const Round = ({ red, blue, round, handleSwipe, handleHold }) => (
  <Hammer
    onPan={handleSwipe}
    onPress={handleHold}
    direction={Hammer.DIRECTION_HORIZONTAL}
    options={{time: 1500, threshold: 0}}>
    <div className="round">
      <div className="round__side">{ red }</div>
      <div className="round__number">{ round }</div>
      <div className="round__side">{ blue }</div>
    </div>
  </Hammer>
)

export default Round;

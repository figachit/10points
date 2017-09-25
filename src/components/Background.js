import React from 'react';

const Background = ({ showtime, scores }) => (
  <div className="background">
    <div className="background__intro">
      { showtime ? (
          scores
          ? <p className="background__text">Swipe round to correct scores.<br/>Long press to reset them.</p>
          : <p className="background__text">Tap the buttons to choose the winner. Swipe left or right to score the knockdown.</p>
        ) : (
          <p className="background__text">«Basically, what you want to know is: Who's hurting the other guy more than the other guy is hurting him? And if you can figure that out, then he gets <strong>10</strong> points and the other guy gets <strong>9</strong>. It's that simple.» – <a href="http://www.hbo.com/boxing/inside/features/article/how-to-score-a-fight-right-with-harold-lederman.html" className="background__text--name">Harold Lederman</a></p>
      )}
    </div>
  </div>
)

export default Background;

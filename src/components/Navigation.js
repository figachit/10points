import React from 'react';

const Navigation = ({ showtime, scores, cache, resume, start, reset, share, save }) => {
  return scores ? (
    <div className="navigation">
      <div className="button button--nav" onClick={share}>Share</div>
      <div className="button button--nav" onClick={reset}>Reset</div>
    </div>
  ) : (
    <div className="navigation">
      { cache && <div className="button button--nav" onClick={resume}>Continue</div> }
      <div className="button button--nav" onClick={start}>Start</div>
  </div>
  )
}

export default Navigation;

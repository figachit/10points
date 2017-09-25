import React from 'react';
import Button from './Button';

const Toolbar = ({ show, showToolbar, undoRound, resetScores, scores, addBookmark, showInput }) => {
  const classname = ['toolbar', show ? 'toolbar--show' : ''].join(' ');
  return (
    <div className={classname}>
      <div>
        <Button action={showToolbar}>close</Button>
      </div>
      {/* <div className="toolbar__text" style={{ display: showInput ? 'flex' : 'none' }}>
        <input className="toolbar__input" type="text"/>
        <Button action={addBookmark} active={true}>done</Button>
      </div> */}
      <div>
        <Button action={undoRound} active={scores.length}>undo</Button>
        <Button action={resetScores} active={scores.length}>delete</Button>
        <Button active={false}>bookmark_border</Button>
      </div>
    </div>
  )
}

export default Toolbar;

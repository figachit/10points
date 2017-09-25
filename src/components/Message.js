import React from 'react';

const Message = ({ message, discard }) => {
  const classname = ['message', message ? 'message--show' : ''].join(' ');
  return (
    <div className={classname} onClick={discard}>{ message }</div>
  )
}

export default Message;

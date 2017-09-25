import React, { Component } from 'react';
import './History.css';

const data = [
  {
    red: 'Floyd Mayweather',
    blue: 'Conor MacGregor',
    result: 'TKO',
    scores: [[9,10],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9]],
  },
  {
    red: 'Vasyl Lomachenko',
    blue: 'Axe Man',
    result: 'UD',
    scores: [[9,10],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9]],
  },
  {
    red: 'Gennady Golovkin',
    blue: 'Danny Jacobs',
    result: 'UD',
    scores: [[9,10],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9],[10,9]],
  },
]


const Bout = ({ red, blue, result }) => (
  <div className="history__item">
    <div className="history__side">{ red }</div>
    <div className="history__result">{ result }</div>
    <div className="history__side">{ blue }</div>
  </div>
)

const History = () => (
  <div className="history">
    {
      data.map((item, i) => <Bout red={item.red} blue={item.blue} result={item.result} key={i}/>)
    }
  </div>
)

export default History;

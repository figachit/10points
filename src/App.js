import React, { Component } from 'react';

import Message from './components/Message';
import Header from './components/Header';
import Controls from './components/Controls';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Scorecard from './components/Scorecard';
import Toolbar from './components/Toolbar';

import './App.css';

const AppBar = ({ children }) => <div className="appbar">{ children }</div>;

class App extends Component {
  state = {
    showtime: false,
    rounds: 12,
    min: 6,
    red: 10,
    blue: 10,
    message: null,
    scores: [],
    cache: false,
    menu: false,
    // scores: [[10, 9], [10, 9], [9, 10]],
    // debug: [],
  }

  pointerDown = false;
  swipe = false;
  req = true;
  raf = null;
  timer = null;

  componentDidMount() {
    this.checkLocalStorage();
    this.initTouchHandlers();

    window.addEventListener('animationend', ev => ev.target.classList.remove('shake'));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.scores.length !== prevState.scores.length) {
      this.score.scrollTop = this.score.scrollHeight;
    }
  }

  initTouchHandlers() {
    window.addEventListener('touchmove', this.pointerMoveHandler);
    window.addEventListener('touchend', this.pointerUpHandler);
    window.addEventListener('touchcancel', this.pointerUpHandler);
  }

  checkLocalStorage = () => {
    if (localStorage.getItem('scores')) {
      this.setState({ cache: true });
    }
  }

  resumeScoring = () => {
    if (this.state.cache) {
      const cache = localStorage.getItem('scores');
      const scores = cache.split('.').map(item => item.split(',').map(Number));
      this.setState({
        cache: false,
        showtime: scores.length !== this.state.rounds,
        scores
      });
    }
  }

  startScoring = () => {
    // if (localStorage.getItem('scores')) {
    //   localStorage.removeItem('scores');
    // }
    this.setState({ showtime: true });
  }

  showResult = () => {
    const [red, blue] = this.state.scores.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0,0]);
    // const winner = red === blue ? 'DRAW' : red > blue ? 'RED' : 'BLUE';
    const simple = `${red}-${blue}`;
    // alert(simple);
    return simple;

    // let a = 0;
    // this.state.scores.forEach((item) => {
    //   if (item[0] > item[1]) a++;
    // })
    // const complex = `${a}-${this.state.rounds-a} ${winner}`;
    // alert(complex);
  }

  resetScores = () => {
    // this.showResult();
    localStorage.removeItem('scores');
    this.setState({ scores: [], showtime: true, cache: false });
  }

  saveScores = () => {
    this.setState({ scores: [], showtime: false, cache: true });
  }

  shareScores = () => {
    const text = this.showResult();
    if (navigator.share) {
      // const url = document.location.host;
      navigator.share({ text })
      .then(() => console.log('Successful share'))
      .catch((err) => console.log('Error sharing', err));
    } else {
      prompt('Copy this', text);
    }
  }

  shake = (target) => {
    target.classList.add('shake');
    window.navigator.vibrate([50, 30, 150]);
  }

  redWin = (ev) => {
    this.win(ev, 'red');
  }

  blueWin = (ev) => {
    this.win(ev, 'blue');
  }

  win = (ev, who) => {
    if (this.state[who] < 10) {
      this.shake(ev.target);
      this.showMessage('To win, knocked out fighter have to avenge his knockdowns.');
    } else {
      const { red, blue } = this.state;
      const round = who === 'red' ? [10, blue - 1] : [red - 1, 10];
      this.pushRound(round);
    }
  }

  draw = (ev) => {
    if (this.state.blue < 10 || this.state.red < 10) {
      this.shake(ev.target);
    } else {
      this.pushRound([10, 10]);
    }
  }

  undoRound = () => {
    const scores = this.state.scores.slice(0,-1);
    const showtime = scores.length !== this.state.rounds;

    localStorage.setItem('scores', scores.join('.'));

    this.setState({ scores, showtime });
  }

  pushRound = (round) => {
    window.navigator.vibrate(25);

    const scores = [...this.state.scores];

    if (scores.length >= this.state.rounds) {
      scores.length = 0;
    } else {
      scores.push(round);
    }

    localStorage.setItem('scores', scores.join('.'));

    this.setState({
      scores,
      red: 10,
      blue: 10,
      showtime: scores.length !== this.state.rounds,
      message: null,
    });
  }

  knockdown = (side) => {
    const { red, blue, min } = this.state;
    if (this.state[side] - 1 < min) {
      this.shake(this.target);
    } else {
      const scores = side === 'red'
      ? { red: red - 1, blue: blue + 1 }
      : { red: red + 1, blue: blue - 1 }
      this.setState(scores);
      window.navigator.vibrate(50);
    }
  }

  bump = (side) => {
    const min = this.state.min;
    const children = Array.from(this.target.parentNode.children);
    const index = children.indexOf(this.target);
    const scores = [...this.state.scores];
    let [ red, blue ] = scores[index];

    side === 'red' ? red-- : blue--;

    if (red < this.state.min || blue < this.state.min) {
      this.target.classList.add('shake');
      window.navigator.vibrate([25, 10, 75]);
    } else {
      scores[index] = [Math.max(min, red), Math.max(min, blue)];
      localStorage.setItem('scores', scores.join('.'));
      this.setState({ scores });
      window.navigator.vibrate(25);
    }
  }

  resetRound = () => {
    window.navigator.vibrate(250);
    const children = Array.from(this.target.parentNode.children);
    const index = children.indexOf(this.target);
    const scores = [...this.state.scores];
    scores[index] = [10, 10];
    localStorage.setItem('scores', scores.join('.'));
    this.setState({ scores });
  }

  showMessage = (message) => {
    this.setState({ message });
  }

  discardMessage = () => {
    this.setState({ message: null });
  }

  rafSwipe = () => {
    this.target.style.transform = `translate3d(${this.moveX}px, 0, 0)`;
    this.req = true;
  }

  longPress = (e) => {
    clearTimeout(this.timer);
    this.timer = null;
    this.resetRound();
  }

  pointerDownHandler = (e, props) => {
    e.stopPropagation();

    if (this.pointerDown) return;
    if (e.touches && e.touches.length > 1) return;

    this.pointerDown = true;

    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startY = e.touches ? e.touches[0].clientY : e.clientY;
    this.target = e.currentTarget;

    this.holdable = props.onHold || false;
    this.swipable = props.onSwipe || false;

    if (this.holdable) {
      this.timer = setTimeout(() => props.onHold(), props.delay || 500);
    }

    if (e.type === 'mousedown') {
      window.addEventListener('mousemove', this.pointerMoveHandler);
      window.addEventListener('mouseup', this.pointerUpHandler);
    }
  }

  pointerMoveHandler = (e) => {
    e.stopPropagation();

    const clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;

    const deltaX = Math.abs(clientX - this.startX);
    const deltaY = Math.abs(clientY - this.startY);

    if (this.timer && (deltaX || deltaY)) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (!this.swipable) return;

    if (!this.swipe && deltaX >= 5) {
      // this.startX += clientX - this.startX > 0 ? 5 : -5;
      this.startX = clientX;
      this.swipe = deltaX > deltaY;
    }

    if (this.swipe) {
      this.moveX = Math.max(-72, Math.min(clientX - this.startX, 72));
      if (this.req) {
        this.req = false;
        this.raf = requestAnimationFrame(this.rafSwipe);
      }
    }
  }

  pointerUpHandler = (e) => {
    e.stopPropagation();
    
    if (e.touches && e.touches.length) return;
    if (!this.pointerDown) return;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const scorecard = this.target.parentNode === this.scorecard;

    if (this.moveX === 72) {
      scorecard ? this.bump('red') : this.knockdown('red');
    } else if (this.moveX === -72) {
      scorecard ? this.bump('blue') : this.knockdown('blue');
    }

    this.swipe = false;

    this.pointerDown = false;
    this.holdable = false;
    this.swipable = false;

    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;

    this.target.style.transform = 'none';
    this.target = null;

    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.req = true;
      this.raf = null;
    }

    if (e.type === 'mouseup') {
      window.removeEventListener('mousemove', this.pointerMoveHandler);
      window.removeEventListener('mouseup', this.pointerUpHandler);
    }
  }

  showToolbar = (e) => {
    this.setState({ toolbar: !this.state.toolbar });
  }

  addBookmark = (e) => {
    this.setState({ bookmark_input: !this.state.bookmark_input });
  }

  getRef = (ref, name) => {
    this[name] = ref;
  }

  render() {
    return (
      <div className="App">
        <Message
          message={this.state.message}
          discard={this.discardMessage}
        />
        <AppBar>
          <Toolbar
            show={this.state.toolbar}
            showToolbar={this.showToolbar}
            undoRound={this.undoRound}
            resetScores={this.resetScores}
            scores={this.state.scores}
            addBookmark={this.addBookmark}
            showInput={this.state.bookmark_input}
          />
        </AppBar>
        <Header
          getRef={this.getRef}
          scores={this.state.scores}
          showToolbar={this.showToolbar}
          handleTouch={this.pointerDownHandler}
        />
        <Background
          scores={this.state.scores.length}
          showtime={this.state.showtime}
        />
        <Scorecard
          getRef={this.getRef}
          scores={this.state.scores}
          handleTouch={this.pointerDownHandler}
          onSwipe={true}
          onHold={this.resetRound}
        />
        <Navigation
          getRef={this.getRef}
          showtime={this.state.showtime}
          scores={this.state.scores.length}
          cache={this.state.cache}
          start={this.startScoring}
          resume={this.resumeScoring}
          reset={this.resetScores}
          share={this.shareScores}
          save={this.saveScores}
        />
        <Controls
          pointerDownHandler={this.pointerDownHandler}
          handleSwipe={this.handleSwipe}
          redWin={this.redWin}
          blueWin={this.blueWin}
          draw={this.draw}
          red={this.state.red}
          blue={this.state.blue}
          first={this.state.start}
          final={this.state.final}
          showtime={this.state.showtime}
        />
      </div>
    );
  }
}

export default App;

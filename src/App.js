import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardState: [],
      turn: 'x'
    }
    for (let x = 0; x < 9; x++) {
      this.state.boardState.push('')
    }
  }

  BoardSpaces() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <div className="playarea">
          {this.BoardSpace(i)}
        </div>
      )
    }
    return rows;
  }

  BoardSpace(i) {
    if(this.state.boardState[i] === 'x'){
      return <div className='playspace'>x</div>
    }
    else if(this.state.boardState[i] === 'o'){
      return <div className='playspace'>o</div>
    }
    else{
      return <button className='playspace' style={{backgroundColor: this.state.boardState[i]}} onClick={() => this.move(i)}/>
    }
  }

  move(i) {
    const newBoardState = this.state.boardState.slice()
    newBoardState[i] = this.state.turn === 'x' ? 'x' : 'o'
    this.setState({turn: this.state.turn === 'x' ? 'o' : 'x', boardState: newBoardState})
  }
  

  render() {
    return (
      <div className="App">
        <div className="boardspace">
          {this.BoardSpaces(this.state.boardState, (board) => {this.setState({boardState: board, turn: this.state.turn})})}
        </div>
      </div>
    );
  }
}

export default App;

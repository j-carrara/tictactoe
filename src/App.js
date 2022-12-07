import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.client = props.client
    this.state = {
      boardState: [],
      turn: '',
      win: '',
      winning_tiles: []
    }
    this.client.onmessage = (message) => {
      const recieved = JSON.parse(message.data)
      this.setState({boardState: recieved.boardState, turn: recieved.turn, win: recieved.win, winning_tiles: recieved.winning_tiles})
    };
  }

  BoardSpaces() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <div className="playarea" key={i}>
          {this.BoardSpace(i)}
        </div>
      )
    }
    return rows;
  }

  BoardSpace(i) {
    if(this.state.boardState[i] === 'x'){
      return <div className='playspace' name={i} style={{color: this.state.winning_tiles.includes(i) ? "green": "black"}}>x</div>
    }
    else if(this.state.boardState[i] === 'o'){
      return <div className='playspace' name={i} style={{color: this.state.winning_tiles.includes(i) ? "green": "black"}}>o</div>
    }
    else{
      return <button className='playspace' name={i} style={{backgroundColor: this.state.boardState[i]}} onClick={() => this.move(i)}/>
    }
  }

  Footer() {
    if(this.state.win || !this.state.boardState.includes('')){
      return <button onClick={this.reset}>Reset</button>
    }
    else {
      return <p style={{"fontSize": "30px"}}> Turn: {this.state.turn} </p>
    }
  }

  move(i) {
    if(!this.state.win){
      axios.post('http://justagiraffe.us:3001/move?space='+i)
    }
  }

  reset() {
    axios.post('http://justagiraffe.us:3001/reset')
  }
  

  render() {
    return (
      <div className="App">
        <div className="boardspace">
          {this.BoardSpaces(this.state.boardState, (board) => {this.setState({boardState: board, turn: this.state.turn})})}
        </div>
        <div>
          {this.Footer()}
        </div>
      </div>
    );
  }
}

export default App;

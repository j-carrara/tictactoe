class TicTacToe {
    constructor(){
        this.state = this.initialState()
    }

    initialState() {
        return {
            boardState: ['', '', '', '', '', '', '', '', ''],
            turn: 'x',
            win: false,
            winning_tiles: [],
        }
    }

    resetState() {
        this.state = this.initialState()
    }

    swapTurn() { this.state.turn = this.state.turn === 'x' ? 'o' : 'x'}

    move(space, player) {
        this.state.boardState[space] = player
    }

    won() {
        return this.state.win
    }
    
    checkWin() {
        
        this.checkLineForWin([0, 4, 8]) //TL-BR diagonal
        this.checkLineForWin([2, 4, 6]) //TR-BL diagonal
    
        for (let x = 0; x < 3; x++) {
            let vertical = []
            let horizontal = []
    
            for (let y = 0; y < 3; y++) {
                vertical.push((x * 3) + y)
                horizontal.push(x + (y * 3))
            }
    
            this.checkLineForWin(vertical)
            this.checkLineForWin(horizontal)
    
        }
    }
    checkLineForWin(space_list) {
        let winning = this.state.boardState[space_list[0]] !== '' && this.state.boardState[space_list[0]] === this.state.boardState[space_list[1]] && this.state.boardState[space_list[1]] == this.state.boardState[space_list[2]]
        if (winning) {
            this.state.win = true
            for (let tile in space_list) {
                this.state.winning_tiles.push(space_list[tile])
            }
        }
    }
}

module.exports = TicTacToe
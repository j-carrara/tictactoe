// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const expressWs = require("express-ws")(app);
const path = require("path")

let boardState = ['','','','','','','','','']
let turn = 'x'
let win = false
let winning_tiles = []
let aWss = expressWs.getWss('/');

function broadcast() {
    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify({boardState: boardState, turn: turn, win: win, winning_tiles: winning_tiles}));
      });
}

function checkWin() {
    function checkLine(space_list) {
        winning = boardState[space_list[0]] !== '' && boardState[space_list[0]] === boardState[space_list[1]] && boardState[space_list[1]] == boardState[space_list[2]]
        if(winning){
            win = true
            for(tile in space_list){
                winning_tiles.push(space_list[tile])
            }
        }
    }

    checkLine([0, 4, 8])
    checkLine([2, 4, 6])

    for(let x = 0; x < 3; x++){
        let vertical = []
        let horizontal = []

        for(let y = 0; y < 3; y++){
            vertical.push((x*3)+y)
            horizontal.push(x+(y*3))
        }

        checkLine(vertical)
        checkLine(horizontal)

    }
}

app.use(express.static(path.join(__dirname, 'build')));

app.ws("/", (ws, req) => {
    ws.send(JSON.stringify({boardState: boardState, turn: turn, win: win, winning_tiles: winning_tiles}));
  });

app.post("/state", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(win){
        res.json({message: "Someone already won."});
        return
    }
    boardState[req.query.space] = turn
    checkWin()
    turn = turn === 'x' ? 'o' : 'x'
    broadcast()

    res.json({message: "Made move."});
});

app.post("/reset", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    boardState = ['','','','','','','','','']
    turn = 'x'
    win = false
    winning_tiles = []

    broadcast()

    res.json({message: "Reset game."});
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
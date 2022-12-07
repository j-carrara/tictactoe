const { response } = require("express")
const express = require("express")
const path = require("path")
const TicTacToe = require("./TicTacToe")
const app = express()
const expressWs = require("express-ws")(app)
const wss = expressWs.getWss('/')
const game = new TicTacToe()

function broadcastStateChange(state) {wss.clients.forEach(function (client) {client.send(JSON.stringify(state))})}

function completeResponse(target, message) {
    target.setHeader('Access-Control-Allow-Origin', '*')
    target.json({ message: message})
}

app.ws("/", (ws, _) => {ws.send(JSON.stringify(game.state))})

app.use(express.static(path.join(path.resolve(__dirname, '..'), 'build')))


app.post("/move", (req, res) => {
    if (game.won()) { message = "Someone already won." }
    else {
        game.move(req.query.space, game.state.turn)
        game.checkWin()
        game.swapTurn()
        broadcastStateChange(game.state)
        message = "Made move."
    }
    completeResponse(res, response)
})

app.post("/reset", (_, res) => {
    game.resetState()
    broadcastStateChange(game.state)
    completeResponse(res, "Reset game.")
})

app.listen(3001, () => {console.log(`Server listening on ${3001}`)})
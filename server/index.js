const express = require('express')
const app = express()
const socket = require('express-ws')(app)

const aWss = socket.getWss()

const PORT = process.env.PORT || 5002;

const { connectionHandler, broadcastConnection } = require('./connection/connectionHandler')

app.ws('/', (ws) => {
    console.log('Connection!')
     ws.on('message', data => {
        const msg = JSON.parse(data.toString())
        switch(msg.method){
            case "connection":
                connectionHandler(ws, msg, aWss)    
                break;
            case "move":
                broadcastConnection(ws, msg, aWss)
                break;
        }
    })
})

app.listen(PORT, () => console.log(`Connectino on ${PORT} port`))
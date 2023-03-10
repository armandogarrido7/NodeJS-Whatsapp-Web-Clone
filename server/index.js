const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const path = require('path');

// const { Server } = require('socket.io');
// const cors = require('cors');

const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": false
        };
        res.writeHead(200, headers);
        res.end();
    },
    cors: {
        origin: '*',
        // origin: ["http://localhost:8080", "http://localhost:5173","http://localhost:80", "http://localhost/cors", "http://localhost:4000", "http://localhost:5500"],
        methods: ["GET", "POST"]
    },
    allowEIO3: true
});

const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '/public');

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });
// function hash(string) {
//     return createHash('sha256').update(string).digest('hex');
// }
function getRandomColor(){
    rnd_index = Math.floor(Math.random() * userColors.length);
    return userColors[rnd_index];
}
let userConnected = 0;
let userList = {};
var userColors = ['#FF0000', '#00FF00', '#0000FF', '#00BFFF', '#7B68EE', '#FFDF00', '#00FA9A', '#FF1493'];

io.on('connection', (socket) => {
    userConnected++;
    let user_color = getRandomColor();
    socket.emit('setUserParams', socket.id, user_color);
    if (!userList[socket.id]){
        userList[socket.id] = {
            id : socket.id,
            color: user_color
        };
        io.emit('updateUsers', userList);    
    }
    socket.on('userLogin', (username, img, state) => {
        userList[socket.id].username = username;
        userList[socket.id].img = img;
        userList[socket.id].state = state;
        socket.broadcast.emit('userConnected', socket.id, userList[socket.id].username + " se ha conectado");
        io.emit('updateUsers', userList);
    })
    socket.on('updateProfile', (username, img) => {
        userList[socket.id].username = username;
        userList[socket.id].img = img;
        io.emit('updateUsers', userList);
    });
    socket.on('sendGroupMessage', (message) => {
        io.emit('newGroupMessage', message)
    });
    socket.on('msgRead', (user_id) => {
        socket.to(user_id).emit('msgRead', socket.id);
    });
    socket.on('isUserTyping', (user_id, state) => {
        socket.to(user_id).emit('isUserTyping', socket.id, state);
    });
    socket.on('messageToUser', (message, user_id) => {
        socket.to(user_id).emit("messageToUser", socket.id, message);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', socket.id, userList[socket.id].username + " se ha desconectado");
        userConnected--;
        delete userList[socket.id];
        io.emit('updateUsers', userList);
    });
    
    
  })

server.listen(port, () => {
    console.log('listening on ' + port);
});

  
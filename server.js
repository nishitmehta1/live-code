// require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const livecode = express.Router();
const path = require('path');
const port = process.env.PORT || 4000;
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production';

// Socket IO
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('join', ({ name, roomid }, callback) => {
    // console.log(name, roomid);
    user = {
      name: name,
      room: roomid
    };

    socket.in(user.room).emit('user connected');

    socket.join(user.room);
  });

  socket.on('updateText', ({ newText, room }, callback) => {
    // console.log(newText, room);
    // console.log(io.sockets.adapter.rooms[room]);
    newText = newText.toString();
    socket.in(room).emit('update', { newText });
  });

  socket.on('checkRoom', ({ room }, callback) => {
    // console.log(io.sockets.adapter.rooms);
    if (!io.sockets.adapter.rooms[room]) {
      socket.emit('falseRoom');
    }
  });

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });
});
io.listen(8000);

livecode.route('/').get((req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(bodyParser.json());

// userRoutes.route('/').get((req, res) => {
//   const userId = req.session.userId;
//   if (!userId) {
//     res.json({ data: 'LOGIN' });
//   } else {
//     console.log(userId);
//     res.json({
//       data: 'LOGGEDIN',
//       user: req.session.user,
//       userId: userId
//     });
//   }
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/', livecode);

app.listen(port, () => {
  console.log(`Started @ ${port}`);
});

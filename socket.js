const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const {
  addFriend,
  getFriendByName,
  getAllFriends,
  doesFriendExist,
  removeFriend,
} = require("./friends");

require("dotenv").config();

const io = socketio(process.env.PORT || 5000, {
  cors: {
    origin: ["http://localhost:3000", "https://taki-socket-ameer.com"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (payload, callback, numberOfPlayers) => {
    const { error, newUser } = addUser({
      id: socket.id,
      name: payload.user?.userNameInGame,
      username: payload.user?.username,
      room:
        getUsersInRoom(payload.room).length === numberOfPlayers
          ? payload.room + 1
          : payload.room,
      level: payload.user?.level,
      coins: payload.user?.coins,
      img: payload.user?.img,
      numberOfPlayers: numberOfPlayers,
    });
    if (error) return callback(error);

    socket.join(newUser.room);
    // console.log(getUsersInRoom(newUser.room));
    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });
    socket.emit("currentUserData", { name: newUser.name });
    callback();
  });

  socket.on("initGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("initGameState", gameState);
  });

  socket.on("updateGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("updateGameState", gameState);
  });

  socket.on("sendMessage", (payload, callback) => {
    const user = getUser(socket.id);
    io.to(user?.room).emit("message", {
      user: user?.name,
      text: payload.message,
    });
    callback();
  });
});

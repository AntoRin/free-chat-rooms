const express = require("express");
const path = require("path");
const fs = require("fs");
const socketio = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));

app.post("/auth/token", (req, res) => {
  let data = req.body;
  let token = jwt.sign(data, process.env.SECRET);
  res.json({status: "ok", token});
});

app.post("/auth/verify", (req, res) => {
  let {roomId} = req.body;
  try {
    let {roomName, password} = jwt.verify(roomId, process.env.SECRET);
    return res.json({status: "ok", roomName, password});
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({status: "error", message: error.message});
  }
});

app.get("/public/rooms", (req, res) => {
  fs.readFile("./connectedUsers.json", {encoding: "utf-8"}, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({status: "error"});
    } else {
      let publicRooms = [];
      if (data) {
        let allRooms = JSON.parse(data);
        if (Object.keys(allRooms).length > 0) {
          for (const room in allRooms) {
            if (allRooms[room][0].public === true) publicRooms.push(room);
          }
        } else {
          return res.json({status: "ok", publicRooms});
        }
      }
      res.json({status: "ok", publicRooms});
    }
  });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

let io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async socket => {
  console.log("Socket connected");
  const promisifiedConnectedUsers = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        "./connectedUsers.json",
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err);
          else return resolve(data);
        }
      );
    });
  };

  let connectedUsers = await promisifiedConnectedUsers();
  let parsedList;
  if (connectedUsers) parsedList = JSON.parse(connectedUsers);
  else parsedList = {};
  let chatRoom;
  socket.on("room", async room => {
    // console.log(room);
    if (!parsedList[room.room]) parsedList[room.room] = [];

    parsedList[room.room].push({
      name: room.name,
      _id: socket.id,
      public: room.isPublic,
    });
    let allUsers = parsedList;
    const promisifiedWriteFile = () => {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          "./connectedUsers.json",
          JSON.stringify(allUsers, null, 4),
          err => {
            if (err) return reject(err);
            else return resolve("file written");
          }
        );
      });
    };
    await promisifiedWriteFile();
    chatRoom = room.room;
    socket.join(room.room);
    io.to(room.room).emit("info", `${room.name} has joined the room`);
    io.to(room.room).emit("allConnectedUsers", allUsers[room.room]);
  });

  socket.on("chat", chat => {
    io.to(chatRoom).emit("message", chat);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    fs.readFile("./connectedUsers.json", {encoding: "utf-8"}, (err, data) => {
      if (err) return console.log(err);
      else {
        // console.log("the current chat room is:", chatRoom);
        let objectData;
        if (data) objectData = JSON.parse(data);
        else objectData = {};
        // console.log(objectData[chatRoom]);
        if (Object.keys(objectData).length > 0 && objectData[chatRoom]) {
          let disconnectedUserIndex;

          let disconnectedUser = objectData[chatRoom].find((user, index) => {
            disconnectedUserIndex = index;
            return user._id === socket.id;
          });

          objectData[chatRoom].splice(disconnectedUserIndex, 1);
          if (objectData[chatRoom].length < 1) delete objectData[chatRoom];
          fs.writeFile(
            "./connectedUsers.json",
            JSON.stringify(objectData, null, 4),
            err => {
              if (err) return console.log(err);
            }
          );
          io.to(chatRoom).emit("allConnectedUsers", objectData[chatRoom]);
        }
      }
    });
  });
});

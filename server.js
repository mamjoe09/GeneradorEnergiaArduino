const express = require("express");
const { SerialPort, ReadlineParser } = require("serialport");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// ⚙️ Cambiá "COM3" por el puerto real de tu Arduino
const port = new SerialPort({ path: "COM14", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", data => {
  const [volt, curr, pow] = data.split(",");
  io.emit("datos", { volt, curr, pow });
});

server.listen(3000, () => console.log("🌐 Servidor en http://localhost:3000"));

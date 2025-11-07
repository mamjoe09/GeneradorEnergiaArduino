import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.json());

let ultimoDato = { volt: 0, curr: 0, pow: 0 };

// 📥 Endpoint que recibe los datos del Arduino (desde tu PC)
app.post("/datos", (req, res) => {
  ultimoDato = req.body;
  io.emit("datos", ultimoDato);
  console.log("📈 Datos actualizados:", ultimoDato);
  res.sendStatus(200);
});

// 🌐 Verificación
app.get("/", (req, res) => res.send("Servidor online 🔥"));

server.listen(3000, () => console.log("✅ Servidor Render activo"));

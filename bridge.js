import { SerialPort, ReadlineParser } from "serialport";
import fetch from "node-fetch";

// Configurar el puerto donde está el Arduino
const port = new SerialPort({ path: "COM3", baudRate: 9600 }); // cambia COM3 si es distinto
const parser = new ReadlineParser();
port.pipe(parser);

console.log("📡 Esperando datos del Arduino...");

parser.on("data", async (data) => {
  const [volt, curr, pow] = data.trim().split(",");
  const payload = { volt, curr, pow };

  console.log("🔌 Datos del Arduino:", payload);

  // Enviar datos al servidor Render
  try {
    const res = await fetch("https://generador-energia-arduino.onrender.com/datos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("🌐 Enviado al servidor:", res.status);
  } catch (error) {
    console.error("❌ Error al enviar:", error.message);
  }
});

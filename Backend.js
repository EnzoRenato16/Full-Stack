const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let deviceStates = {
  luz_sala: "off",
  ar_condicionado: "off",
  sensor_movimento: false
};

// Simulando eventos que alteram estado
app.post('/evento', (req, res) => {
  const { dispositivo, evento } = req.body;

  switch (dispositivo) {
    case "luz_sala":
      deviceStates.luz_sala = evento === "ligar" ? "on" : "off";
      break;
    case "ar_condicionado":
      deviceStates.ar_condicionado = evento === "ligar" ? "on" : "off";
      break;
    case "sensor_movimento":
      deviceStates.sensor_movimento = evento === "detectar";
      break;
    default:
      return res.status(400).json({ erro: "Dispositivo não reconhecido" });
  }

  return res.json({ status: "ok", estadoAtual: deviceStates });
});

app.get('/estados', (req, res) => {
  return res.json(deviceStates);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

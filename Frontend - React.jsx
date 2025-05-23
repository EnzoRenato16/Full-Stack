import { useState, useEffect } from 'react';

export default function App() {
  const [estado, setEstado] = useState({});

  const buscarEstados = async () => {
    const res = await fetch('http://localhost:3001/estados');
    const data = await res.json();
    setEstado(data);
  };

  const enviarComando = async (dispositivo, evento) => {
    await fetch('http://localhost:3001/evento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dispositivo, evento }),
    });
    buscarEstados();
  };

  useEffect(() => {
    buscarEstados();
  }, []);

  return (
    <div className="p-6 font-sans space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Painel de Automação Residencial</h1>
      
      <div className="space-y-2">
        <h2>Luz da Sala: {estado.luz_sala}</h2>
        <button className="bg-green-500 px-4 py-2 text-white rounded" onClick={() => enviarComando('luz_sala', 'ligar')}>Ligar</button>
        <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={() => enviarComando('luz_sala', 'desligar')}>Desligar</button>
      </div>

      <div className="space-y-2">
        <h2>Ar Condicionado: {estado.ar_condicionado}</h2>
        <button className="bg-green-500 px-4 py-2 text-white rounded" onClick={() => enviarComando('ar_condicionado', 'ligar')}>Ligar</button>
        <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={() => enviarComando('ar_condicionado', 'desligar')}>Desligar</button>
      </div>

      <div className="space-y-2">
        <h2>Sensor de Movimento: {estado.sensor_movimento ? "Movimento Detectado" : "Sem Movimento"}</h2>
        <button className="bg-blue-500 px-4 py-2 text-white rounded" onClick={() => enviarComando('sensor_movimento', 'detectar')}>Simular Movimento</button>
      </div>
    </div>
  );
}

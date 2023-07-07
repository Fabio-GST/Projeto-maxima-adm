import React, { useState, useEffect } from 'react';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Lógica para buscar os logs da API
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div className="logs-page">
      <h2>Logs de Usuários</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>Usuário:</strong> {log.usuario}
            <br />
            <strong>Ação:</strong> {log.acao}
            <br />
            <strong>Data:</strong> {log.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPage;

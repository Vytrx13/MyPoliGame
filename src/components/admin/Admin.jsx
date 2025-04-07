import React, { useState, useEffect } from 'react';
import './Admin.css'; // Importando o arquivo CSS externo

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar os dados das tabelas
  const fetchData = async () => {
    try {
      const response = await fetch('/admin/get-tables');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      const data = await response.json();
      setUsuarios(data.usuarios);
      setRegistros(data.registros);
    } catch (err) {
      setError(err.message);
    }
  };

  // Buscar dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Função para deletar um usuário
  const handleDeleteUser = async (username) => {
    if (!window.confirm(`Tem certeza que deseja deletar o usuário ${username}?`)) {
      return;
    }
    try {
      const response = await fetch('/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }
      fetchData(); // Atualizar os dados após a exclusão
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para deletar um registro
  const handleDeleteRegistro = async (id) => {
    if (!window.confirm(`Tem certeza que deseja deletar o registro com ID ${id}?`)) {
      return;
    }
    try {
      const response = await fetch('/admin/delete-registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar registro');
      }
      fetchData(); // Atualizar os dados após a exclusão
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="admin-container">
      <h1 id="admin-title">Administração</h1>
      {error && <p id="admin-error">{error}</p>}
      <button id="admin-refresh-button" onClick={fetchData}>Atualizar Tabelas</button>

      <h2 id="admin-users-title">Usuários</h2>
      <table id="admin-users-table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome de Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <button
                  id={`delete-user-${user.id}`}
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.username)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="admin-records-title">Registros</h2>
      <table id="admin-records-table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome de Usuário</th>
            <th>Tipo</th>
            <th>ID do Jogo</th>
            <th>Nome do Jogo</th>
            <th>URL da Imagem</th>
            <th>Nota</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.username}</td>
              <td>{registro.tipo}</td>
              <td>{registro.jogo_id}</td>
              <td>{registro.nome_jogo}</td>
              <td>{registro.url_imagem}</td>
              <td>{registro.rating}</td>
              <td>
                <button
                  id={`delete-registro-${registro.id}`}
                  className="delete-button"
                  onClick={() => handleDeleteRegistro(registro.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

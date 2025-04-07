import React, { useState, useEffect } from 'react';
import './Admin.css'; // Importando o arquivo CSS externo

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);

  
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


   // Fetch data on component mount
   useEffect(() => {
    fetchData();
   }, []);


  return (
    // Use class instead of ID for container if preferred, adjust CSS accordingly
    <div id="admin-container">
      <h1 id="admin-title">Administração</h1>
      {error && <p id="admin-error">{error}</p>}
      <button id="admin-refresh-button" onClick={fetchData}>Atualizar Tabelas</button>

      <h2 id="admin-users-title">Usuários</h2>
      {/* Wrap table in responsive container */}
      <div className="table-responsive-container">
          <table id="admin-users-table" border="1"> {/* Keep border for now, CSS can override */}
            <thead>
              <tr>
                <th>ID do Usuário</th>
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
                      // Use classes for targeting if needed, avoid dynamic IDs unless necessary
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
      </div>

      <h2 id="admin-records-title">Registros</h2>
       {/* Wrap table in responsive container */}
      <div className="table-responsive-container">
          <table id="admin-records-table" border="1"> {/* Keep border for now */}
            <thead>
              <tr>
                <th>ID do registro</th>
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
                  {/* Make image URL potentially smaller or wrap */}
                  <td style={{ maxWidth: '150px', overflowWrap: 'break-word' }}>{registro.url_imagem}</td>
                  <td>{registro.rating}</td>
                  <td>
                    <button
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
    </div>
  );
}
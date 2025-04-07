import React, { useState, useEffect } from 'react';
import './Admin.css'; // Importando o arquivo CSS externo

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);

  // ... (fetchData, handleDeleteUser, handleDeleteRegistro functions remain the same) ...

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
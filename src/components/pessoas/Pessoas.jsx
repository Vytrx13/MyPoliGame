import { useState, useEffect } from "react";
import Listas from "../listas/Listas";
import "./Pessoas.css";

export default function Pessoas({ user }) {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPessoas = async () => {
      try {
        const res = await fetch("/listas/get-todas-pessoas");

        if (res.ok) {
          const users = await res.json();
          console.log(users);
          setAllUsers(users);
        } else {
          throw new Error("Erro ao buscar usuários.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar usuários.");
      }
    };

    getPessoas();
  }, []);
  function onPessoaSelect(username) {
    console.log(username);
    setSelectedPerson(username);
  }

  function handleBackToList() {
    setSelectedPerson("");
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!allUsers) return <p className="loading-message">Carregando...</p>;
  if (allUsers.length === 0)
    return <p className="empty-message">Nenhuma pessoa encontrada</p>;

  let filteredUsers = [];

  if (allUsers) {
    const term = searchTerm.toLowerCase();

    filteredUsers = allUsers.filter((user) => {
      const username = user.username.toLowerCase();
      return username.startsWith(term);
    });
  }
  if (selectedPerson) return (
    <>
      <button className="back-button" onClick={handleBackToList}>
        Voltar para a lista de pessoas
      </button>
      <Listas user={user} donoLista={selectedPerson} />
    </>
  );

  return (
    <>
      <input
        type="text"
        className="search-bar"
        placeholder="Pesquisar pessoas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pessoas-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.username}
              className="pessoa-card"
              onClick={() => onPessoaSelect(user.username)}
            >
              <h4 className="pessoa-nome">{user.username}</h4>
            </div>
          ))
        ) : (
          <p className="empty-message">
            Nenhum usuário encontrado com esse nome.
          </p>
        )}
      </div>
    </>
  );
}

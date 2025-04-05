import { useState, useEffect } from "react";
import "./Pessoas.css";

export default function Pessoas() {
  const [allUsers, setAllUsers] = useState(null);
  const [isPersonSelected, setIsPersonSelected] = useState(false);
  const [error, setError] = useState(null);
  

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
    setIsPersonSelected(true);
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!allUsers) return <p className="loading-message">Carregando...</p>;
  if (allUsers.length === 0) return <p className="empty-message">Nenhuma pessoa encontrada</p>;

  return (
    <div className="pessoas-container">
      {allUsers.map((user) => (
        <div
          key={user.username}
          className="pessoa-card"
          onClick={() => onPessoaSelect(user.username)}
        >
          <h4 className="pessoa-nome">{user.username}</h4>
        </div>
      ))}
    </div>
  );
}

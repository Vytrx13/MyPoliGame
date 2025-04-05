import { useState, useEffect } from "react";

export default function Pessoas() {
  const [allUsers, setAllUsers] = useState(null);
  const [isPersonSelected, setIsPersonSelected] = useState(false);

  useEffect(() => {
    const getPessoas = async () => {
        try {
            const res = await fetch("/listas/get-todas-pessoas");

            if (res.ok) {
                const users = await res.json();
                console.log(users);
                setAllUsers(users);
            } else{
                throw new Error(res.error);
            }
        } catch (err) {
            console.error(err);  
        }

    };
    getPessoas();


  }, [])
  function onPessoaSelect(username) {
    console.log(username);
  }

  return (
    <>
      {!allUsers && <p>Carregando...</p>}
      {allUsers && allUsers.length === 0 && <p>Nenhuma pessoa encontrada</p>}
      {allUsers && allUsers.length > 0 && (
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
      )}
    </>
  );
}

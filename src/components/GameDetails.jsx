import React, { useState } from "react";
import "./GameDetails.css";

export default function GameDetails({ game, isLoading, user }) {
  if (isLoading || !game) {
        return <div className="loading-message">Carregando jogo...</div>;
  }
  const [selectedList, setSelectedList] = useState("");
  const [score, setScore] = useState("");

  // const [currentList , setCurrentList] = useState(null);
  // const [currentScore, setCurrentScore ] = useState(null);
  // const [registroId, setRegistroId] = useState(null);
// TODO: SE ESSE REGISTROID FOR DIFERENTE DE NULL POSSO GARANTIR Q JA EXISTE NA LISTA, ENT N PRECISA VERIFICAR
// NO BACKEND SE EXISTE OU N
// REFATORAR ESSA PARTE 
// PARA FACILITAR EH MELHOR SEPARAR A RODA add em add e update
// O useEffect EH CHAMADO QND O COMPONENTE EH CARREGADO, DA PRA VERIFICAR SE JA EXISTE NESSE PONTO

  const gameId = game.id;
  const gameName = game.name;
  const imageUrl = game.image ? game.image.original_url : "/default-game.png";

  // useEffect(() => {
  //   const checkGameInList = async () => {
  //     if (!user) return; 
  
  //     try {
  //       // procurar se ja existe e se ja existe, preciso do rating tipo e do registroId
  //     } catch (err) {
  //       setError("Erro ao verificar a lista do usuário.");
  //       console.error(err);
  //     }
  //   };
  
  //   checkGameInList();
  // }, []);
  

  const handleSelectChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
        const res = await fetch("/listas/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, selectedList, gameId, gameName, imageUrl, score }),
        });
        alert(`Jogo adicionado à lista: ${selectedList} com nota: ${score}`);
    } catch (err) {
        setError(err.message);
        alert("error:", err);
        setGames(null);
    }
   
    
  };



  return (
    <>
      <div className="game-header">
        <h1>{game.name}</h1>
      </div>

      <div className="game-content">
        <img src={imageUrl} alt={game.name} />
        <div className="game-info">
          { user !== null && <form onSubmit={handleSubmit}>
            <label htmlFor="game-list">Adicione à sua lista:</label>
            <select
              id="game-list"
              name="game-list"
              value={selectedList}
              onChange={handleSelectChange}
              className="custom-select"
            >
              <option value="" disabled>
                Selecione em qual lista adicionar
              </option>
              <option value="jogado">Jogado</option>
              <option value="jogando">Jogando</option>
              <option value="lista-de-desejos">Lista de desejos</option>
              <option value="dropado">Dropado</option>
            </select>

            <label htmlFor="game-score">Dê uma nota (0 a 10):</label>
            <select
              id="game-score"
              name="game-score"
              value={score}
              onChange={handleScoreChange}
              className="custom-select"
            >
              <option value="" disabled>
                Selecione uma nota
              </option>
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <input type="submit" value="Adicionar" className="custom-button" />
          </form>}

          {/* Informações adicionais sobre o jogo */}
          <p>
            <strong>Plataformas:</strong>{" "}
            {game.platforms
              ? game.platforms.map((p) => p.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Gêneros:</strong>{" "}
            {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}
          </p>
          <p>
            <strong>Data de lançamento original:</strong>{" "}
            {game.original_release_date || "Desconhecida"}
          </p>
          <p>
            <strong>Descrição:</strong> {game.deck || "N/A"}
          </p>
          <p>
            <strong>Personagens:</strong>{" "}
            {game.characters
              ? game.characters.map((p) => p.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Desenvolvedores:</strong>{" "}
            {game.developers
              ? game.developers.map((p) => p.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Franquias:</strong>{" "}
            {game.franchises
              ? game.franchises.map((p) => p.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Publicadoras:</strong>{" "}
            {game.publishers
              ? game.publishers.map((p) => p.name).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </>
  );
}

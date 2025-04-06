import React, { useState, useEffect } from "react";
import "./GameDetails.css";

export default function GameDetails({ game, user }) {

  const [selectedList, setSelectedList] = useState("");
  const [score, setScore] = useState("");

  const [currentList, setCurrentList] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [jogoNaLista, setjogoNaLista] = useState(false);

  const [error, setError] = useState(null);



  const gameId = game.id;
  const gameName = game.name;
  const imageUrl = game.image ? game.image.original_url : "/default-game.png";

  useEffect(() => {
    const checkGameInList = async () => {
      console.log("check gamessss in list");
      if (!user) {
        console.log("!user");
        return;
      }
      
      console.log(user, gameId);
      try {
        // procurar se ja existe e se ja existe, preciso do rating tipo e do jogoNaLista
        // const gameId = game.id;
        const res = await fetch("/listas/check-game-in-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, gameId }),
        });

        if (res.ok) {
          const { tipo, rating, id } = await res.json();
          console.log(tipo, rating, id);
          setCurrentList(tipo);
          setCurrentScore(rating);
          setjogoNaLista(id > 0);

          setSelectedList(currentList || "");
          setScore(currentScore || "");

        } else {
          throw new Error(res.error);
          console.log(res.error);
          console.log(" deu ruim");
        }

      } catch (err) {
        setError("Erro ao verificar a lista do usuário.");
        console.error(err);
        console.log(err);
      }
    };

    checkGameInList();
  }, [user, gameId, jogoNaLista]);


  const handleSelectChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    // console.log("handle submit")
    event.preventDefault();


    try {
      // const gameId = game.id;
      // const gameName = game.name;
      // const imageUrl = game.image ? game.image.original_url : "/default-game.png";
      const res = await fetch("/listas/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, selectedList, gameId, gameName, imageUrl, score }),
      });
      alert(`Jogo adicionado à lista: ${selectedList} com nota: ${score}`);
      setCurrentList(selectedList);
      setCurrentScore(score);
      setjogoNaLista(true);
    } catch (err) {
      setError(err.message);
      alert("error:", err);
      setGames(null);
    }


  };

  async function handleRemover() {
    console.log("handle remover")
    try {
      // const gameId = game.id;
      const res = await fetch("listas/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, gameId }),
      });

      if (res.ok) {
        alert("Jogo removido com sucesso!");
        setjogoNaLista(false);
        setCurrentScore(null);
        setCurrentList(null);
      }
      else alert("erro ao removero jogo", res.error);
    } catch (err) {
      setError("Erro ao remover jogo da lista");
      console.log(err);
    }
  }

  // if (isLoading || !game) {
  //   return <div className="loading-message">Carregando jogo...</div>;
  // }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <div className="game-header">
        <h1>{game.name}</h1>
      </div>

      <div className="game-content">
        <img src={imageUrl} alt={game.name} />
        <div className="game-info">
          {user !== null && <form onSubmit={handleSubmit}>
            <label htmlFor="game-list">{!jogoNaLista ? "Adicione à sua lista:" : "Esse jogo já está na sua lista, mas você pode mudar a lista e a nota"}</label>
            {jogoNaLista && <p className="jogo-na-lista"> O jogo no momento está na lista {currentList} com a nota {currentScore}</p>}
            {jogoNaLista && <p className="jogo-na-lista">Para qual lista mover o jogo?</p>}
            
            <select
              id="game-list"
              name="game-list"
              value={selectedList}
              onChange={handleSelectChange}
              className="custom-select"
            >

              <option value="" disabled>
                {!jogoNaLista ? "Selecione em qual lista adicionar" : "Selecione para qual lista mover o jogo"}
              </option>
              <option value="Jogado">Jogado</option>
              <option value="Jogando">Jogando</option>
              <option value="Lista-de-desejos">Lista de desejos</option>
              <option value="Dropado">Dropado</option>
            </select>

            <label htmlFor="game-score">{!jogoNaLista ? "Dê uma nota:" : "Atualize a nota:"}</label>

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

            {selectedList && score && <input type="submit" value={!jogoNaLista ? "Adicionar" : "Atualizar"} className="custom-button" />}
            {jogoNaLista && <button type="button" onClick={handleRemover} className="remover">Remover jogo da lista</button>}
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

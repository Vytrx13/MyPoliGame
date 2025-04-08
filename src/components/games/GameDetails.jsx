import React, { useState, useEffect } from "react";
import "./GameDetails.css";

// Changed prop name from 'user' to 'currentUser'
export default function GameDetails({ game, currentUser }) {

  const [selectedList, setSelectedList] = useState("");
  const [score, setScore] = useState("");
  const [currentList, setCurrentList] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [jogoNaLista, setJogoNaLista] = useState(false); // Corrected typo in state variable name
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(true); // For loading list status
  const [registroId, setRegistroId] = useState(null); // Store the ID for potential updates/deletes


  // Ensure game object exists before trying to access its properties
  if (!game) {
      // Or return a loading state, or a specific error message
      return <div className="loading-message">Carregando detalhes do jogo...</div>;
  }

  const gameId = game.id;
  const gameName = game.name;
  const imageUrl = game.image ? game.image.original_url : "/default-game.png"; // Keep default image logic

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component
    setIsChecking(true);
    setError(null); // Clear previous errors on new game check

    const checkGameInList = async () => {
      // Use 'currentUser' prop for the check
      if (!currentUser || !gameId) {
        if (isMounted) {
            setJogoNaLista(false);
            setSelectedList("");
            setScore("");
            setCurrentList("");
            setCurrentScore(0);
            setRegistroId(null);
            setIsChecking(false);
        }
        return;
      }

      try {
        const res = await fetch("/listas/check-game-in-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Backend expects 'user', so pass currentUser as its value
          body: JSON.stringify({ user: currentUser, gameId }),
        });

        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.exists) {
            setCurrentList(data.tipo);
            setCurrentScore(data.rating);
            setRegistroId(data.id);
            setJogoNaLista(true);
            // Pre-fill form with existing data
            setSelectedList(data.tipo || "");
            setScore(data.rating !== null ? String(data.rating) : ""); // Ensure score is string for select value
          } else {
            setJogoNaLista(false);
            setSelectedList("");
            setScore("");
            setCurrentList("");
            setCurrentScore(0);
            setRegistroId(null);
          }
        } else if (!res.ok && isMounted) {
             // Handle non-OK responses from the check endpoint
             const errorData = await res.json().catch(() => ({ message: `HTTP error ${res.status}` }));
             setError(errorData.message || `Erro ${res.status} ao verificar lista.`);
             setJogoNaLista(false); // Assume not in list on error
        }
      } catch (err) {
        if (isMounted) {
          setError("Erro de rede ao verificar a lista do usuário.");
          console.error("Check list error:", err);
          setJogoNaLista(false); // Assume not in list on network error
        }
      } finally {
        if (isMounted) setIsChecking(false);
      }
    };

    checkGameInList();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => { isMounted = false; };
  }, [currentUser, gameId]); // Dependency array includes currentUser and gameId


  const handleSelectChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!selectedList || score === "") {
        setError("Por favor, selecione uma lista e uma nota.");
        return;
    }

    if (!currentUser) {
        setError("Você precisa estar logado para adicionar/atualizar jogos.");
        return;
    }

    try {
      const res = await fetch("/listas/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend expects 'user', pass currentUser
        body: JSON.stringify({
            user: currentUser,
            selectedList,
            gameId,
            gameName,
            imageUrl,
            score: parseInt(score, 10) // Ensure score is sent as number
        }),
      });

      if (res.ok) {
          const result = await res.json();
          alert(result.message || `Jogo ${jogoNaLista ? 'atualizado na' : 'adicionado à'} lista: ${selectedList} com nota: ${score}`);
          // Update local state to reflect changes immediately
          setCurrentList(selectedList);
          setCurrentScore(parseInt(score, 10));
          setJogoNaLista(true); // Now it's definitely in the list
          // Re-fetch the check to get the potentially new registroId if needed, or update from response if backend sends it
          // For simplicity, we'll just update the known state here.
      } else {
          const errorData = await res.json().catch(() => ({ message: `HTTP error ${res.status}` }));
          setError(errorData.message || `Erro ${res.status} ao ${jogoNaLista ? 'atualizar' : 'adicionar'} jogo.`);
          console.error("Submit error data:", errorData);
      }

    } catch (err) {
      setError("Erro de rede ao salvar na lista.");
      console.error("Submit network error:", err);
    }
  };

  async function handleRemover() {
    setError(null); // Clear previous errors

     if (!currentUser) {
        setError("Você precisa estar logado para remover jogos.");
        return;
    }

    if (!window.confirm("Tem certeza que deseja remover este jogo da sua lista?")) {
        return;
    }

    try {
      const res = await fetch("/listas/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         // Backend expects 'user', pass currentUser
        body: JSON.stringify({ user: currentUser, gameId }),
      });

      if (res.ok) {
        alert("Jogo removido com sucesso!");
        // Reset local state
        setJogoNaLista(false);
        setCurrentScore(null); // Use null or empty string based on preference
        setCurrentList("");
        setSelectedList("");
        setScore("");
        setRegistroId(null);
      } else {
          const errorData = await res.json().catch(() => ({ message: `HTTP error ${res.status}` }));
          setError(errorData.message || `Erro ${res.status} ao remover o jogo.`);
          console.error("Remove error data:", errorData);
      }
    } catch (err) {
      setError("Erro de rede ao remover jogo da lista");
      console.error("Remove network error:", err);
    }
  }

  return (
    <>
      {/* Error display */}
      {error && <div className="error-message">{error}</div>}

      {/* Game Header */}
      <div className="game-header">
        <h1>{game.name}</h1>
      </div>

      {/* Game Content Area */}
      <div className="game-content">
        <img src={imageUrl} alt={game.name} />

        {/* Game Info and Actions */}
        <div className="game-info">
          {/* List Management Form - only if logged in */}
          {currentUser !== null ? (
            <form onSubmit={handleSubmit}>
              {isChecking ? (
                <p>Verificando sua lista...</p>
              ) : (
                <>
                  <label htmlFor="game-list">
                    {jogoNaLista ? "Atualizar status na sua lista:" : "Adicionar à sua lista:"}
                  </label>

                  {jogoNaLista && (
                    <p className="jogo-na-lista">
                      Status atual: <strong>Lista: {currentList}, Nota: {currentScore ?? 'N/A'}</strong>
                    </p>
                  )}

                  <select
                    id="game-list"
                    name="game-list"
                    value={selectedList}
                    onChange={handleSelectChange}
                    className="custom-select"
                    required // Make selection mandatory
                  >
                    <option value="" disabled>
                      Selecione uma lista...
                    </option>
                    <option value="Jogado">Jogado</option>
                    <option value="Jogando">Jogando</option>
                    <option value="Lista-de-desejos">Lista de desejos</option>
                    <option value="Dropado">Dropado</option>
                  </select>

                  <label htmlFor="game-score">
                    Nota:
                  </label>

                  <select
                    id="game-score"
                    name="game-score"
                    value={score}
                    onChange={handleScoreChange}
                    className="custom-select"
                    required // Make score mandatory
                  >
                    <option value="" disabled>
                      Selecione uma nota...
                    </option>
                    {/* Generate options 0-10 */}
                    {[...Array(11).keys()].map((num) => (
                      <option key={num} value={String(num)}>
                        {num}
                      </option>
                    ))}
                  </select>

                  {/* Submit Button: Enable only if list and score are selected */}
                  <input
                      type="submit"
                      value={jogoNaLista ? "Atualizar" : "Adicionar"}
                      className="custom-button"
                      disabled={!selectedList || score === ""} // Disable if no selection
                  />


                  {/* Remove Button: Show only if the game is already in the list */}
                  {jogoNaLista && (
                    <button
                      type="button" // Important: type="button" prevents form submission
                      onClick={handleRemover}
                      className="remover"
                    >
                      Remover jogo da lista
                    </button>
                  )}
                </>
              )}
            </form>
          ) : (
             // Message for logged-out users
            <p>Faça Login ou crie uma conta para adicionar jogos às suas listas.</p>
          )}

          {/* Additional Game Information */}
          <p>
            <strong>Plataformas:</strong>{" "}
            {game.platforms?.map((p) => p.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Gêneros:</strong>{" "}
            {game.genres?.map((g) => g.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Data de lançamento original:</strong>{" "}
            {game.original_release_date || "Desconhecida"}
          </p>
          {/* Use dangerouslySetInnerHTML only if you trust the source (Giant Bomb API)
              and need the HTML formatting. Otherwise, display as plain text.
              Be cautious as this can be an XSS risk if the source is not trusted. */}
          {game.deck && (
              <p><strong>Descrição:</strong> {game.deck}</p>
              /* Or if description contains HTML you want rendered:
              <p><strong>Descrição:</strong> <span dangerouslySetInnerHTML={{ __html: game.deck }} /></p>
              */
          )}
          <p>
            <strong>Personagens:</strong>{" "}
            {game.characters?.map((p) => p.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Desenvolvedores:</strong>{" "}
            {game.developers?.map((p) => p.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Franquias:</strong>{" "}
            {game.franchises?.map((p) => p.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Publicadoras:</strong>{" "}
            {game.publishers?.map((p) => p.name).join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
}
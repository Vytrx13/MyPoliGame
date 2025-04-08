import './ListaContainer.css';
import GameDetails from '../games/GameDetails'; // Ensure path is correct
import { useState, useEffect } from 'react';

// Changed prop name 'user' to 'currentUser'
export default function ListaContainer({ currentUser, donoLista, tipoLista, toggleSeletorVisivel }) {

    const [games, setGames] = useState(null); // Games in the current list view
    const [selectedGameData, setSelectedGameData] = useState(null); // Details of selected game
    const [isGameSelected, setIsGameSelected] = useState(false); // Controls view
    const [isLoading, setIsLoading] = useState(true); // Loading state for list or details
    const [error, setError] = useState(null); // Error state

    // Fetch games for the list when donoLista or tipoLista changes, or when returning from details view
    useEffect(() => {
        // Only fetch list if we are not showing game details
        if (!isGameSelected) {
            const fetchListGames = async () => {
                setIsLoading(true);
                setError(null);
                setGames(null); // Clear previous games

                if (!donoLista) {
                    setError("Usuário da lista não especificado.");
                    setIsLoading(false);
                    return;
                }

                try {
                    const res = await fetch("/listas/get-games-from-list", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ donoLista, tipoLista: tipoLista || "" }), // Send empty string if tipoLista is ""
                    });

                    if (res.ok) {
                        const listGames = await res.json();
                        setGames(listGames);
                    } else {
                        const errorData = await res.json().catch(() => ({ message: `HTTP error ${res.status}` }));
                        setError(errorData.message || `Erro ${res.status} ao buscar jogos da lista.`);
                        setGames([]); // Set empty on error to show "empty message"
                    }
                } catch (err) {
                    setError("Erro de rede ao buscar jogos da lista.");
                    console.error("Fetch list games error:", err);
                    setGames([]); // Set empty on error
                } finally {
                    setIsLoading(false);
                }
            };
            fetchListGames();
        }
    }, [donoLista, tipoLista, isGameSelected]); // Re-fetch if these change or if returning to list view

    async function handleGameSelect(gameFromList) {
        setIsGameSelected(true);
        toggleSeletorVisivel(false); // Hide the list type selector
        setSelectedGameData(null); // Clear previous details
        setError(null);
        setIsLoading(true); // Show loading for fetching details

        const gameId = gameFromList.jogo_id; // Get ID from the list item
        console.log("Selected game id from list:", gameId);

        try {
            // Fetch full game details using the gameId
            const res = await fetch("/games/game-selected", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId }),
            });

            if (res.ok) {
                const data = await res.json();
                setSelectedGameData(data); // Set the fetched full details
            } else {
                let message = `Erro ${res.status}`;
                 try {
                    const errorData = await res.json();
                    message = errorData.message || errorData.error || message;
                } catch (e) { /* Ignore if body isn't JSON */ }

                switch (res.status) {
                    case 429:
                         setError("Limite de requisições atingido. Tente novamente mais tarde.");
                         break;
                    case 404:
                         setError("Detalhes do jogo não encontrados (pode ter sido removido da API externa).");
                         break;
                    default:
                         setError(`Erro ao buscar detalhes do jogo: ${message}`);
                 }
                setSelectedGameData(null);
                setIsGameSelected(false); // Go back to list view on error?
                toggleSeletorVisivel(true); // Show selector again
            }
        } catch (err) {
            setError("Erro de rede ao buscar detalhes do jogo.");
            console.error("Game select from list network error:", err);
            setSelectedGameData(null);
            setIsGameSelected(false); // Go back to list view on error?
            toggleSeletorVisivel(true); // Show selector again
        } finally {
            setIsLoading(false);
        }
    }

    // Go back from details view to the list view
    const handleBackToList = () => {
        setIsGameSelected(false);
        setSelectedGameData(null);
        toggleSeletorVisivel(true); // Show the list selector again
        setError(null); // Clear errors
        // The useEffect will trigger a re-fetch of the list if needed
    };

    // ---- Render Logic ----

    // Loading State
    if (isLoading) {
        return <p className="loading-message">Carregando...</p>;
    }

    // Error State
    if (error && !isGameSelected) { // Show list-related errors only when viewing the list
        return <p className="error-message">{error}</p>;
    }


    // Display Game Details View
    if (isGameSelected) {
        return (
            <>
                {/* Back button always visible in details view */}
                <button className="back-button" onClick={handleBackToList}>
                    Voltar para a lista de {donoLista}
                </button>
                 {/* Show details loading/error specifically for details view */}
                 {isLoading && <p className="loading-message">Carregando detalhes...</p>}
                 {error && <p className="error-message">{error}</p>}

                {/* Render GameDetails only if data is available and not loading */}
                {!isLoading && selectedGameData && (
                     <GameDetails game={selectedGameData} currentUser={currentUser} />
                 )}
                 {/* Handle case where details failed to load but isLoading is false */}
                 {!isLoading && !selectedGameData && !error && (
                     <p className="error-message">Não foi possível carregar os detalhes do jogo.</p>
                 )}
            </>
        );
    }

    // Display List View (default)
    if (!isGameSelected) {
        if (games === null) {
             // Should ideally be covered by loading/error states, but as a fallback
            return <p className="loading-message">Carregando lista...</p>;
        }
        if (games.length === 0) {
            return <div className="empty-message">Nenhum jogo encontrado {tipoLista ? `na lista "${tipoLista}"` : 'nas listas'} de {donoLista}.</div>;
        }

        // Render the grid of games from the list
        return (
            <div className="games-container">
                {/* Title can be dynamic based on filter */}
                <h3 className="games-title">
                    {tipoLista ? `Lista "${tipoLista}"` : "Todas as Listas"} de {donoLista}
                 </h3>
                <div className="games-grid">
                    {games.map(game => (
                        <div
                            // Use a combination of IDs for key if possible, or index as last resort
                            key={`${game.jogo_id}-${game.tipo}`} // Assuming jogo_id might appear in multiple lists
                            className="game-card"
                            onClick={() => handleGameSelect(game)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleGameSelect(game)}
                        >
                            {/* Use a default image if url_imagem is missing */}
                            <img
                                src={game.url_imagem || "/default-game.png"}
                                alt={game.nome_jogo}
                                className="game-image"
                            />
                            <h4 className="game-name">{game.nome_jogo}</h4>
                            {/* Only show type/score if not filtering by type */}
                            {!tipoLista && <h4 className='lista'>Lista: {game.tipo}</h4>}
                            <h4 className='score'>Nota: {game.rating ?? 'N/A'}</h4>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

     // Fallback return (shouldn't be reached ideally)
     return null;
}
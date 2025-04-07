import { useState } from "react";
import GamesContainer from "./GamesContainer.jsx";
import GameDetails from "./GameDetails.jsx";
import './Search.css';

// Changed prop name from 'user' to 'currentUser'
export default function Search({ currentUser }) {
    const [searchVal, setSearchVal] = useState("");
    const [games, setGames] = useState(null); // Stores search results
    const [selectedGameData, setSelectedGameData] = useState(null); // Stores details of the selected game
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGameSelected, setIsGameSelected] = useState(false); // Controls view (search results vs details)

    async function search() {
        // Reset state for a new search
        setIsGameSelected(false);
        setSelectedGameData(null);
        setGames(null);
        setError(null);

        if (!searchVal.trim()) {
             setError("Por favor, digite um termo para pesquisar.");
             return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/games/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchVal }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setGames(data);
                } else {
                    setGames([]); // Set to empty array if results are empty
                }
            } else {
                 // Handle specific errors from backend
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
                         setError("Nenhum jogo encontrado para este termo.");
                         setGames([]); // Ensure empty state is shown
                         break;
                    default:
                         setError(`Erro ao buscar jogos: ${message}`);
                }
                 setGames(null); // Or keep empty array: setGames([]) ?
            }

        } catch (err) {
            setError("Erro de rede ao pesquisar jogos.");
            console.error("Search network error:", err);
            setGames(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGameSelect(game) {
        // Clear previous search results and errors
        setGames(null);
        setError(null);
        setIsGameSelected(true); // Switch view to details
        setSelectedGameData(null); // Clear previous details
        setIsLoading(true); // Show loading for fetching details

        const gameId = game.id;
        console.log("Selected game id:", gameId);

        try {
             const res = await fetch("/games/game-selected", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId }),
            });

            if (res.ok) {
                const data = await res.json();
                setSelectedGameData(data); // Set the fetched game details
            } else {
                 // Handle specific errors from backend
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
                         setError("Detalhes do jogo não encontrados.");
                         break;
                    default:
                         setError(`Erro ao buscar detalhes do jogo: ${message}`);
                 }
                setSelectedGameData(null);
                setIsGameSelected(false); // Optionally switch back to search view on error?
            }
        } catch (err) {
            setError("Erro de rede ao buscar detalhes do jogo.");
            console.error("Game select network error:", err);
            setSelectedGameData(null);
            setIsGameSelected(false); // Optionally switch back
        } finally {
            setIsLoading(false);
        }
    }

    // Function to go back from details view to search input (doesn't re-run search)
    const handleBackToSearch = () => {
        setIsGameSelected(false);
        setSelectedGameData(null);
        // Keep the search results (games state) if you want users to return to them
        // Or clear them: setGames(null);
        setError(null); // Clear errors when going back
    };

    return (
        <div className="search-container">
            {/* Search Input Area - Always visible unless showing details? Or hide when details shown? */}
            {!isGameSelected && (
                <div className="search-controls">
                    <p>Pesquise por um jogo</p>
                    <input
                        placeholder="Nome do jogo"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && search()}
                    />
                    <button onClick={search} disabled={isLoading}>
                        {/* More specific loading text */}
                        {isLoading && !isGameSelected ? "Pesquisando..." : "Pesquisar"}
                    </button>
                </div>
            )}

             {/* Back Button - Show only when details are displayed */}
             {isGameSelected && (
                 <button onClick={handleBackToSearch} className="back-button" style={{ marginBottom: '1em' }}>
                     Voltar para Pesquisa
                 </button>
             )}

            {/* Display Area: Error, Loading, Search Results, or Game Details */}
            {error && <p className="error-message">{error}</p>}

            {/* Show Loading indicator specifically */}
            {isLoading && <p className="loading-message">Carregando...</p>}

            {/* Show Search Results (GamesContainer) only when not loading and game is not selected */}
            {!isLoading && !isGameSelected && games !== null && (
                <GamesContainer
                    games={games}
                    isLoading={false} // Already handled loading state above
                    onGameSelect={handleGameSelect}
                />
            )}

            {/* Show Game Details only when not loading and a game IS selected */}
            {!isLoading && isGameSelected && selectedGameData && (
                <GameDetails
                    game={selectedGameData}
                    currentUser={currentUser} // Pass the logged-in user
                />
            )}
        </div>
    );
}
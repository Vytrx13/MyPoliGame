// Search.jsx
import { useState } from "react";
import GamesContainer from "./GamesContainer.jsx";
import GameDetails from "./GameDetails.jsx";

export default function Search({ user }) {
    const [searchVal, setSearchVal] = useState("");
    const [games, setGames] = useState(null); // para search
    const [gameData, setGameData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGameSelected, setisGameSelected] = useState(false);
    
    // cte acho q da pra economizar mais nesses estados ai mas enfim

    async function search() {
        setisGameSelected(false);
        setGameData(null);

        if (!searchVal.trim()) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const res = await fetch("/games/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchVal }),
            });

            if (res.ok) {
                const data = await res.json();
                setGames(data);
            }
            
            else {
                switch (res.status) {
                    case 429:
                        throw new Error("Limite de requisições atingido. Tente novamente mais tarde.");
                    case 404:
                        throw new Error("Nenhum jogo encontrado");
                    case 500:
                        throw new Error("Erro ao buscar dados da API externa");
                    default:
                        setError("Erro desconhecido");
                }
                setGames(null);
            }
            

        } catch (err) {
            setError(err.message);
            console.error("Search error:", err);
            setGames(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGameSelect(game) {
        setisGameSelected(true);
        setGames(null);
        
        const gameId = game.id
        console.log("Selected game id:", gameId);

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/games/game-selected", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId }),
            });

            if (res.ok) {
                const data = await res.json();
                setGameData(data);
    
            }
            else {
                switch (res.status) {
                    case 429:
                        throw new Error("Limite de requisições atingido. Tente novamente mais tarde.");
                    case 404:
                        throw new Error("Nenhum jogo encontrado");
                    case 500:
                        throw new Error("Erro ao buscar dados da API externa");
                    default:
                        setError("Erro desconhecido");
                }
                setGameData(null);
            }
            


        } catch (err) {
            setError(err.message);
            console.error("Search error:", err);
            setGameData(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="search-container">
            <div className="search-controls">
                <p>Pesquise por um jogo</p>
                <input 
                    placeholder="Nome do jogo" 
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                />
                <button onClick={search} disabled={isLoading}>
                    {isLoading ? "Carregando..." : "Pesquisar"}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            
            { !isGameSelected && <GamesContainer 
                games={games} 
                isLoading={isLoading}
                onGameSelect={handleGameSelect} // recebe o parametro dentro de GamesContainer , aq so to passando ponteiro da funç
            />}


            {isGameSelected && !isLoading && <GameDetails 
                game={gameData}
                user={user}
            />}
            {isGameSelected && isLoading && <p>Carregando...</p>}
        </div>
    );
}
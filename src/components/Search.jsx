// Search.jsx
import { useState } from "react";
import GamesContainer from "./GamesContainer.jsx";


export default function Search({ changePage }) {
    const [searchVal, setSearchVal] = useState("");
    const [games, setGames] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);
    
    async function search() {
        if (!searchVal.trim()) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const res = await fetch("http://localhost:3001/games/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchVal }),
            });
            
            if (!res.ok) {
                throw new Error(res.status === 429 ? 
                    "Limite de requisições atingido. Tente novamente mais tarde." : 
                    "Erro ao buscar jogos.");
            }
            
            const data = await res.json();
            setGames(data);
        } catch (err) {
            setError(err.message);
            console.error("Search error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleGameSelect = (game) => {
        setSelectedGame(game);
        console.log("Selected game:", game);
    };

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
                    {isLoading ? "Pesquisando..." : "Pesquisar"}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            
            <GamesContainer 
                games={games} 
                isLoading={isLoading}
                onGameSelect={handleGameSelect}
            />
        </div>
    );
}
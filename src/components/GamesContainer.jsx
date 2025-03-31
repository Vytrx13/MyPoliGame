// GamesContainer.jsx
import './GamesContainer.css';

export default function GamesContainer({ games, isLoading, onGameSelect }) {
    if (isLoading) {
        return <div className="loading-message">Carregando jogos...</div>;
    }

    
    if (games === null) {
        return null;
    }

    
    if (games.length === 0) {
        return <div className="empty-message">Nenhum jogo encontrado.</div>;
    }

    return (
        <div className="games-container">
            <h3 className="games-title">Resultados da pesquisa:</h3>
            <div className="games-grid">
                {games.map(game => (
                    <div 
                        key={game.id}
                        className="game-card"
                        onClick={() => onGameSelect(game)}
                    >
                        {game.image && (
                            <img 
                                src={game.image.original_url } 
                                alt={game.name}
                                className="game-image"
                            />
                        )}
                        <h4 className="game-name">{game.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
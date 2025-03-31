
import "./GameDetails.css"

export default function GameDetails({ game, isLoading }) {
    if (isLoading || !game) {
        return <div className="loading-message">Carregando jogo...</div>;
    }

    return (
        <>
            <div className="game-header">
                <h1>{game.name}</h1>
            </div>

            <div className="game-content">
                <img
                    src={game.image ? game.image.original_url : '/default-game.png'}
                    alt={game.name}
                />
                <div className="game-info">
                    <p><strong>Plataformas:</strong> {game.platforms ? game.platforms.map(p => p.name).join(', ') : 'N/A'}</p>
                    <p><strong>Gêneros:</strong> {game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A'}</p>
                    <p><strong>Data de lançamento original:</strong> {game.original_release_date || 'Unknown'}</p>
                    <p><strong>Descrição:</strong> {game.deck || 'N/A'}</p>
                    <p><strong>Personagens:</strong> {game.characters ? game.characters.map(p => p.name).join(', ') : 'N/A'}</p>
                    <p><strong>Desenvolvedores:</strong> {game.developers ? game.developers.map(p => p.name).join(', ') : 'N/A'}</p>
                    <p><strong>Franquias:</strong> {game.franchises ? game.franchises.map(p => p.name).join(', ') : 'N/A'}</p>
                    <p><strong>Publicadoras:</strong> {game.publishers ? game.publishers.map(p => p.name).join(', ') : 'N/A'}</p>
                </div>
            </div>
        </>
    );
}

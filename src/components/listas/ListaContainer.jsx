// GamesContainer.jsx
import './ListaContainer.css';
import GameDetails from '../games/GameDetails';
import { useState, useEffect } from 'react';

export default function ListaContainer({ donoLista, tipoLista, user, toggleSeletorVisivel }) {

    const [games, setGames] = useState(null);
    const [isGameSelected, setisGameSelected] = useState(false);
    

    const [isLoading, setIsLoading] = useState(false);
    const [gameData, setGameData] = useState(null);

    // console.log("Lista container donoLista: ", donoLista);
    useEffect(() => {
        const checkList = async () => {
            console.log("chegameonlist");

            if (!donoLista) return;

            try {
                const res = await fetch("/listas/get-games-from-list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ donoLista, tipoLista }),
                });

                if (res.ok) {
                    const games = await res.json();
                    console.log(games);
                    setGames(games);
                } else {
                    throw new Error(res.error);
                }

            } catch (err) {
                // setError("Erro ao verificar a lista do usuário.");
                console.error(err);
            }
        };
        if (!isGameSelected)
        checkList();
    }, [donoLista, isGameSelected, tipoLista, user]);

    if (games === null || games.length === 0) {
        return <div className="empty-message">Nenhum jogo na lista</div>;
    }

    async function onGameSelect(game) {
        setisGameSelected(true);
        toggleSeletorVisivel(false);


        const gameId = game.jogo_id;
        console.log("Selected game id:", gameId);

        setIsLoading(true);


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
            console.error("Search error:", err);
            setGameData(null);
        } finally {
            setIsLoading(false);
        }
    }


    const handleBackToList = () => {
        setisGameSelected(false);
        toggleSeletorVisivel(true);
    };

    return (
        <>
            {!isGameSelected && (
                <>
                    

                    <div className="games-container">
                        <h3 className="games-title">Conteúdo {tipoLista ? `da lista ${tipoLista}` : "de todas as listas"}</h3>
                        <div className="games-grid">
                            {games.map(game => (
                                <div
                                    key={game.id}
                                    className="game-card"
                                    onClick={() => onGameSelect(game)}
                                >
                                    {game.url_imagem && (
                                        <img
                                            src={game.url_imagem}
                                            alt={game.nome_jogo}
                                            className="game-image"
                                        />
                                    )}
                                    <h4 className="game-name">{game.nome_jogo}</h4>
                                    <h4 className='lista'>Lista: {game.tipo}</h4>
                                    <h4 className='score'>Nota: {game.rating}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {isGameSelected && !isLoading && (
                <>
                    <button className="back-button" onClick={handleBackToList}>
                        Voltar para a lista de {donoLista}
                    </button>
                    <GameDetails game={gameData} user={user} />

                </>
            )}
            {isGameSelected && isLoading && <p>Carregando...</p>}

        </>
    );

}
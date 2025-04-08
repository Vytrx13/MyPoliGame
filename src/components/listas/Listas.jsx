import { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import ListaContainer from "./ListaContainer";
import './Listas.css';

// Renamed 'user' prop to 'currentUser' for clarity
// Added 'donoLista' prop which is ONLY passed for '/minha-lista' route
export default function Listas({ currentUser, donoLista = null }) {
    const { username: usernameFromParams } = useParams(); // Get username from URL if present

    // Determine whose list we are viewing
    // If donoLista prop is set (from /minha-lista), use that.
    // Otherwise, use the username from the URL params.
    const targetUser = donoLista || usernameFromParams;

    const [tipoLista, setTipoLista] = useState("");
    const [seletorVisivel, setSeletorVisivel] = useState(true);

    function toggleSeletorVisivel(visivel) { // Renamed param for clarity
        setSeletorVisivel(visivel);
    }

    // If targetUser is somehow still undefined (shouldn't happen with routing), show error/loading
    if (!targetUser) {
        return <p>Erro: Usuário não especificado.</p>;
    }

    return (
        <>
            {seletorVisivel && (
                <>
                    <h2 className="lista-titulo">Lista de {targetUser}</h2>
                    <div className="lista-selector">
                        <label htmlFor="tipoLista">Selecione a lista:</label>
                        <select
                            id="tipoLista"
                            value={tipoLista}
                            onChange={(e) => setTipoLista(e.target.value)}
                            className="custom-select"
                        >
                            <option value="">Todas</option>
                            <option value="Jogando">Jogando</option>
                            <option value="Jogado">Jogado</option>
                            <option value="Dropado">Dropado</option>
                            <option value="Lista-de-desejos">Lista de desejos</option>
                        </select>
                    </div>
                </>
            )}
            {/* Pass the correct user whose list is being viewed */}
            {/* Pass the logged-in user as 'currentUser' for potential actions */}
            <ListaContainer
                currentUser={currentUser}
                donoLista={targetUser}
                tipoLista={tipoLista}
                toggleSeletorVisivel={toggleSeletorVisivel}
            />
        </>
    );
}
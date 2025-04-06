import { useState } from "react";
import ListaContainer from "./ListaContainer";
export default function Listas({ user, donoLista }) {
    const [tipoLista, setTipoLista] = useState("");
    const [seletorVisivel, setSeletorVisivel] = useState(true);

    function toggleSeletorVisivel(condicional) {
        setSeletorVisivel(condicional);
    }
    return (
        <>
            {seletorVisivel && <>
                <h2>Lista de {donoLista}</h2>
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
            </>}
            <ListaContainer user={user} tipoLista={tipoLista} donoLista={donoLista} toggleSeletorVisivel={toggleSeletorVisivel}/>
        </>
    );
}
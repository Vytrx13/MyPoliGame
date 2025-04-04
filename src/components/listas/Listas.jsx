import { useState } from "react";
import ListaContainer from "./ListaContainer";
export default function Listas({ user }) {
    const [tipoLista, setTipoLista] = useState("");


    return (
        <>
            <p>Lista de {user}</p>
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
            <ListaContainer user={user} tipoLista={tipoLista}/>
        </>
    );
}
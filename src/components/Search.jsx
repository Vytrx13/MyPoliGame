import { useState } from "react";

export default function Search({ changePage }) {
    const [searchVal, setSearchVal] = useState("");

    async function search() {
        const res = await fetch("http://localhost:3001/games/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchVal }),
        });
        console.log(res)
    }
    return (
        <div>
            <p style={{ padding: "2rem" }}>Pesquise por um jogo</p>
            <input placeholder="Nome do jogo" onChange={(e) => setSearchVal(e.target.value)}/>
            <button onClick={search}>Pesquisar</button>

        </div>
        // TODO componente GamesContainer (lista de jogos apos pesquisar) e componentes Game (pagina de detalhes do jogo)
    );
}
import { useState } from "react";
import ListaContainer from "./ListaContainer";
export default function Listas ({user}) {

    return (
        <>
        <p>Lista de {user}</p>
        <ListaContainer user={user} />
        </>
    );
}
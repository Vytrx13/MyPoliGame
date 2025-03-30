import "./Header.css";
import HeaderButton from "./HeaderButton.jsx";
export default function Header({logado, changePage}) {

  return (
    <header>
      <p>MyPoliGame</p>
      <nav>
        <ul>
          <HeaderButton onSelect={() => changePage("search")}>Home</HeaderButton>
          <HeaderButton>Jogos</HeaderButton>
          <HeaderButton>Pessoas</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
          {!logado && <HeaderButton onSelect={() => changePage("login")}>Fazer Login</HeaderButton>}
          {!logado && <HeaderButton>Criar Conta</HeaderButton>}
          {logado && <p>Bem vindo usuario!</p>}
        </ul>
      </nav>
    </header>
  );
}
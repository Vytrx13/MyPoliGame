import "./Header.css";
import HeaderButton from "./HeaderButton.jsx";
export default function Header({ logado, changePage, usuario, logout }) {

  return (
    <header>
      <p>MyPoliGame</p>
      {logado && <p>Bem vindo {usuario}!</p>}
      <nav>

        <ul>
          <HeaderButton onSelect={() => changePage("home")}>Home</HeaderButton>
          <HeaderButton onSelect={() => changePage("search")}>Jogos</HeaderButton>
          <HeaderButton>Pessoas</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
          {logado && <HeaderButton onSelect={() => changePage("lista")}>Minha lista</HeaderButton>}
          {!logado && <HeaderButton onSelect={() => changePage("login")}>Fazer Login</HeaderButton>}
          {!logado && <HeaderButton onSelect={() => changePage("register")}>Criar Conta</HeaderButton>}
          {logado && <HeaderButton onSelect={() => {
            logout();
            changePage("home");
          }}>Logout</HeaderButton>}

        </ul>
      </nav>
    </header>
  );
}
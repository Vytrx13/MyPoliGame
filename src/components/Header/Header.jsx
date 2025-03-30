import "./Header.css";
import HeaderButton from "./HeaderButton.jsx";
export default function Header() {

  return (
    <header>
      <p>MyPoliGame</p>
      <nav>
        <ul>
          <HeaderButton>Home</HeaderButton>
          <HeaderButton>Jogos</HeaderButton>
          <HeaderButton>Pessoas</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
        </ul>
      </nav>
    </header>
  );
}

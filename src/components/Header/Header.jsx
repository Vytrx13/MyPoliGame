import { useState } from 'react';
import "./Header.css";
import HeaderButton from "./HeaderButton.jsx";

export default function Header({ logado, usuario, logout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="header-brand">
          <p className="header-title">MyPoliGame</p>
          {logado && <p className="welcome-message">Bem vindo {usuario}!</p>}
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={isMobileMenuOpen ? 'open' : ''}>
          <ul>
            <HeaderButton to="/">Home</HeaderButton>
            <HeaderButton to="/search">Jogos</HeaderButton>
            <HeaderButton to="/pessoas">Pessoas</HeaderButton>
            {usuario === "admin" && <HeaderButton to="/admin">Admin</HeaderButton>}
            {logado && <HeaderButton to="/minha-lista">Minha lista</HeaderButton>}
            {!logado && <HeaderButton to="/login">Fazer Login</HeaderButton>}
            {!logado && <HeaderButton to="/register">Criar Conta</HeaderButton>}
            {logado && <HeaderButton onClick={handleLogout}>Logout</HeaderButton>}
          </ul>
        </nav>
      </div>
    </header>
  );
}
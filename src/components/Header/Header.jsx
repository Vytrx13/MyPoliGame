import "./Header.css";
import HeaderButton from "./HeaderButton.jsx"; // Assuming HeaderButton is modified

export default function Header({ logado, usuario, logout }) {

  // Handler for logout button which needs to perform an action *and* potentially navigate
  const handleLogout = () => {
    logout();
    // Navigation after logout will implicitly happen if the current route becomes protected
    // Or you could explicitly navigate using useNavigate if Header was inside Router context
  };

  return (
    <header>
      <p>MyPoliGame</p>
      {logado && <p>Bem vindo {usuario}!</p>}
      <nav>
        <ul>
          {/* Use the 'to' prop which HeaderButton will now use for <Link> */}
          <HeaderButton to="/">Home</HeaderButton>
          <HeaderButton to="/search">Jogos</HeaderButton>
          <HeaderButton to="/pessoas">Pessoas</HeaderButton>

          {/* Conditional Rendering for Admin Link */}
          {usuario === "admin" && <HeaderButton to="/admin">Admin</HeaderButton>}

          {/* Conditional Rendering for User-Specific Links */}
          {logado && <HeaderButton to="/minha-lista">Minha lista</HeaderButton>}

          {/* Conditional Rendering for Auth Links */}
          {!logado && <HeaderButton to="/login">Fazer Login</HeaderButton>}
          {!logado && <HeaderButton to="/register">Criar Conta</HeaderButton>}

          {/* Logout Button - doesn't use 'to', uses onClick */}
          {logado && <HeaderButton onClick={handleLogout}>Logout</HeaderButton>}
        </ul>
      </nav>
    </header>
  );
}
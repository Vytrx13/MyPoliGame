import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';
function Login({ setUser }) { // Removed changePage prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const login = async () => {
    setError(null); // Clear previous errors
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setUser(username);
        // Navigate to home page after successful login
        navigate('/', { replace: true }); // Use replace to avoid login page in history
      } else {
        const status = res.status;
        let message = "Erro desconhecido";
        try {
            // Try to get error message from backend response body
            const errorData = await res.json();
            message = errorData.message || errorData.error || message;
        } catch (e) {
            // If no JSON body or failed parsing, use status text
             message = res.statusText;
        }

        switch (status) {
          case 400:
            setError("Usuário não encontrado"); // Or use message from backend
            break;
          case 401:
            setError("Senha inválida"); // Or use message from backend
            break;
          default:
             setError(`Erro: ${message} (${status})`);
        }
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Fazer login</h2>
      <div className="auth-form">
        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && login()}
          className="auth-input"
        />
        <button onClick={login} className="auth-button">Entrar</button>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
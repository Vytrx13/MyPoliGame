import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css'
function Register({ setUser }) { // Removed changePage prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const register = async () => {
    setError(null); // Clear previous errors
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setUser(username);
        // Navigate to home page after successful registration
        navigate('/', { replace: true }); // Use replace to avoid register page in history
      }
      else {
        const status = res.status;
        let message = "Erro desconhecido";
         try {
            // Try to get error message from backend response body
            message = await res.text(); // Or res.json() if backend sends JSON errors
        } catch (e) {
            // If no text body or failed parsing, use status text
             message = res.statusText;
        }
        switch (status) {
          case 501: // Backend used 501 for missing fields
            setError("Preencher os campos usuário e senha!"); // Or use message
            break;
          case 502: // Backend used 502 for existing user
            setError("Usuário já existe!"); // Or use message
            break;
          default:
            setError(`Erro: ${message} (${status})`);
        }
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Criar conta</h2>
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
          onKeyDown={(e) => e.key === 'Enter' && register()}
          className="auth-input"
        />
        <button onClick={register} className="auth-button">Registrar</button>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
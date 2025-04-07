import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
    <div>
      <p>Fazer login</p>
      <input
        placeholder="Usuário"
        value={username} // Controlled component
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password} // Controlled component
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && login()}
      />
      <button onClick={login}>Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
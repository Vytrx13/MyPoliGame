import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register({ setUser }) { // Removed changePage prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const register = async () => {
    setError(null); // Clear previous errors
    try {
      console.log(username, password);
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
      console.error(err);
    }
  };

  return (
    <div>
        <p>criar conta</p>
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
        onKeyDown={(e) => e.key === 'Enter' && register()}
      />
      <button onClick={register}>Registrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
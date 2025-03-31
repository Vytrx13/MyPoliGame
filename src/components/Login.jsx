import { useState } from "react";

function Login({ setUser, changePage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setUser(username);
        setError(null);
        changePage("home");
      } else {
        // Verifica o código de status HTTP
        switch (res.status) {
          case 400:
            setError("Usuário não encontrado");
            break;
          case 401:
            setError("Senha inválida");
            break;
          case 500:
            setError("Erro interno do servidor");
            break;
          default:
            setError("Erro desconhecido");
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        // onKeyDown={(e) => e.key === 'Enter' && login()} DEPOIS TESTAR
      />
      <button onClick={login}>Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;

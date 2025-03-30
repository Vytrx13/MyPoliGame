import { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      console.log(username, password);
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(res);

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setUser(username);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erro desconhecido");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Usuário"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;

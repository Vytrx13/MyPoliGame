import { useState } from "react";




function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(username);
    } else {
      alert("Erro no login");
    }
  };

  return (
    <div>
      <input placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Entrar</button>
    </div>
  );
}

export default Login
import { useState } from "react";

function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const register = async () => {
    try {
      console.log(username, password);
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setUser(username);
        alert("Usuário registrado com sucesso!");
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
        <p>criar conta</p>
      <input
        placeholder="Usuário"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        // onKeyDown={(e) => e.key === 'Enter' && register()} DEPOIS TESTAR
      />
      <button onClick={register}>Registrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;

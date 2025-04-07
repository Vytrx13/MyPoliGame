import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// Removed Listas import as it's now handled by routing
import "./Pessoas.css";

// Renamed 'user' prop to 'currentUser' for clarity
export default function Pessoas({ currentUser }) {
  const [allUsers, setAllUsers] = useState(null);
  // Removed selectedPerson state
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate(); // Get navigate function

  useEffect(() => {
    const getPessoas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/listas/get-todas-pessoas");

        if (res.ok) {
          const users = await res.json();
          setAllUsers(users);
        } else {
           const errorText = await res.text();
           throw new Error(errorText || "Erro ao buscar usuários.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Erro ao buscar usuários.");
      } finally {
        setIsLoading(false);
      }
    };

    getPessoas();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle clicking on a person card
  function handlePessoaSelect(username) {
    console.log("Navigating to list for:", username);
    // Navigate to the dynamic list route for the selected user
    navigate(`/listas/${username}`);
  }

  // Filtering logic remains the same
   let filteredUsers = [];
   if (allUsers) {
     const term = searchTerm.toLowerCase();
     filteredUsers = allUsers.filter((user) =>
       user.username.toLowerCase().includes(term) // Use includes for broader search
     );
   }

  // Render states: Loading, Error, No Users, Filtered Users
  if (isLoading) return <p className="loading-message">Carregando pessoas...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!allUsers || allUsers.length === 0) return <p className="empty-message">Nenhuma pessoa encontrada.</p>;

  // The main view with search and user grid
  return (
    <>
      <input
        type="text"
        className="search-bar"
        placeholder="Pesquisar pessoas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pessoas-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.username} // Ensure unique key
              className="pessoa-card"
              onClick={() => handlePessoaSelect(user.username)} // Use handler
              role="button" // Add role for accessibility
              tabIndex={0} // Make it focusable
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePessoaSelect(user.username)} // Keyboard activation
            >
              <h4 className="pessoa-nome">{user.username}</h4>
            </div>
          ))
        ) : (
          <p className="empty-message">
            Nenhum usuário encontrado com esse nome.
          </p>
        )}
      </div>
    </>
  );
}
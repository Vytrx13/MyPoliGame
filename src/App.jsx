import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages & Components
import Home from './components/Home.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Search from './components/games/Search.jsx';
import Listas from './components/listas/Listas.jsx';
import Pessoas from './components/pessoas/Pessoas.jsx';
import Admin from './components/admin/Admin.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

// CSS
import './index.css';

// Helper component for protected routes
function ProtectedRoute({ user, children, requireAdmin = false }) {
  if (!user) {
    
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && user !== 'admin') {
    
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // To prevent flicker

  function logout() {
    localStorage.removeItem('token');
    setUser(null);

  }

  const logado = user !== null;

  // Check token on initial load
  useEffect(() => {
    const checkToken = async () => {
      setLoadingAuth(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch("/auth/verify-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            const { username } = await res.json();
            setUser(username);
          } else {
            // Token invalid or expired
            logout(); // Clear invalid token
          }
        } catch (error) {
          logout(); // Clear token on error
        }
      }
      setLoadingAuth(false);
    };

    checkToken();
  }, []);

  // Show loading indicator while checking auth status
  if (loadingAuth) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      {/* Header and Footer outside Routes to be persistent */}
      <Header logado={logado} usuario={user} logout={logout} />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search currentUser={user} />} />
          <Route path="/pessoas" element={<Pessoas currentUser={user} />} />

          {/* Dynamic Route for User Lists */}
          <Route path="/listas/:username" element={<Listas currentUser={user} />} />

          {/* Auth Routes (redirect if logged in) */}
          <Route
            path="/login"
            element={logado ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
          />
          <Route
            path="/register"
            element={logado ? <Navigate to="/" replace /> : <Register setUser={setUser} />}
          />

          {/* Protected Routes */}
          <Route
            path="/minha-lista"
            element={
              <ProtectedRoute user={user}>
                {/* Pass the logged-in user explicitly for "my list" */}
                <Listas currentUser={user} donoLista={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
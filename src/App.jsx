import { useState, useEffect } from 'react';

// paginas
import Home from './components/Home.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Search from './components/games/Search.jsx';
import Listas from './components/listas/Listas.jsx';
import Pessoas from './components/pessoas/Pessoas.jsx';
import Admin from './components/admin/Admin.jsx';


import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

import './index.css';

function App() {


  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState("home");

  function changePage(newPage) {
    setCurrentPage(newPage)
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }
  const logado = user !== null;

  useEffect(() => {
    const checkToken = async () => {
      // console.log("token:", localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch("/auth/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        const {username} = await res.json();
        // console.log(username);
        setUser(username);
      }
    };

    checkToken();
  }, []);
  return (
    <>
      <Header logado={logado} changePage={changePage} usuario={user} logout={logout} />
      <main>
        {currentPage === "home" && <Home changePage={changePage} />}
        {currentPage === "login" && <Login changePage={changePage} setUser={setUser} />}
        {currentPage === "register" && <Register changePage={changePage} setUser={setUser} />}
        {currentPage === "search" && <Search user={user} />}
        {currentPage === "lista" && <Listas user={user} donoLista={user}/>}
        {currentPage === "pessoas" && <Pessoas user={user}/>}
        {currentPage === "admin" && <Admin/>}
      </main>
      <Footer />
    </>
  );
}

export default App;

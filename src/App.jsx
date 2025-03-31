import { useState } from 'react';

// pages
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Search from './components/Search.jsx';

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

  return (
    <>
      <Header logado={logado} changePage={changePage} usuario={user} logout={logout}/>
      <main>
        {currentPage === "home" && <Home changePage={changePage} />}
        {currentPage === "login" && <Login changePage={changePage} setUser={setUser} />}
        {currentPage === "register" && <Register changePage={changePage} setUser={setUser} />}
        {currentPage === "search" && <Search changePage={changePage} setUser={setUser} />}
      </main>
      <Footer />
    </>
  );
}

export default App;

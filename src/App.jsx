import { useState } from 'react';

// pages
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';


import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {

  
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState("search");

  function changePage(newPage) {
    setCurrentPage(newPage)
  }
  const logado = user !== null;

  return (
    <>
      <Header logado={logado} changePage={changePage} usuario={user}/>
      {currentPage === "search" && <Home changePage={changePage}/>}
      {currentPage === "login" && <Login changePage={changePage} setUser={setUser}/>}
      {currentPage === "register" && <Register changePage={changePage} setUser={setUser}/>}
      <Footer />
    </>
  );
}

export default App;

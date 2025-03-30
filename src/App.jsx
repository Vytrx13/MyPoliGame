import { useState } from 'react';

// pages
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {

  const [logado, setLogado] = useState(false)
  const [currentPage, setCurrentPage] = useState("search");

  function changePage(newPage) {
    setCurrentPage(newPage)
  }


  return (
    <>
      <Header logado={logado} changePage={changePage}/>
      {currentPage === "search" && <Home changePage={changePage}/>}
      {currentPage === "login" && <Login changePage={changePage}/>}
      <Footer />
    </>
  );
}

export default App;

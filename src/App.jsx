import { useState } from 'react';


import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {


  return (
    <>
      <Header />
      <main>
        {/* Aqui entra o conteúdo principal da página */}
        <p style={{ padding: "2rem" }}>Conteúdo da página...</p>
      </main>
      <Footer />
    </>
  );
}

export default App;

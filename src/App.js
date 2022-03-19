import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Cart from './pages/Panier.jsx'
import Confirm from './pages/Confirm.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order/:id' element={<Confirm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

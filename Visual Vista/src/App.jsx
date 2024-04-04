import './App.scss'
import './index.css'
// import { Header } from "./components/Header/Header";
// import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
// import { Products } from "./pages/Products/Products";

import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
            {/* <Route path="/products" element={<Products />} /> */}
          </Routes>

    </>
  )
}

export default App;

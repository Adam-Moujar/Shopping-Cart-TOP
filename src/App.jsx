import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Nav from './components/Nav'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'

function App() {
  return (
    <CartProvider>
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
    </CartProvider>
  )
}

export default App

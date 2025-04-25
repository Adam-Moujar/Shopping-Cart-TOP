// src/components/Nav.jsx
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import CartPanel from './CartPanel'
import { useCart } from '../context/CartContext'
import cartIcon from '../assets/shopping_cart.png';

const Nav = () => {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center relative z-50 shadow-lg">
        <div className="text-xl font-bold">
          <Link to="/">MyStore</Link>
        </div>

        <div className="space-x-6 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'underline text-white font-semibold'
                : 'text-white hover:text-gray-300'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? 'underline text-white font-semibold'
                : 'text-white hover:text-gray-300'
            }
          >
            Shop
          </NavLink>

          <button onClick={toggleCart} className="relative bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300">
            <img
              src={cartIcon}
              alt="Cart"
              className="w-6 h-6 text-white hover:text-gray-200 transition-all duration-300"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartPanel isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  )
}

export default Nav

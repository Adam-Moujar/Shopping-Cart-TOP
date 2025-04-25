import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'

const CartPanel = ({ isOpen, toggleCart }) => {
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isClicking) return 

      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target)
      ) {
        setIsClicking(true) 
        setTimeout(() => {
          toggleCart()
          setIsClicking(false)
        }, 300)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggleCart, isClicking])

  return (
    <>
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => toggleCart()}
        />
      )}

      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={toggleCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border-b pb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-12 w-12 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
                  <div className="text-sm text-gray-500">
                    ${item.price} × {item.quantity}
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 px-3 py-1 rounded-full hover:bg-gray-400 transition duration-200"
                    >
                      -
                    </button>
                    <span className="font-semibold text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 px-3 py-1 rounded-full hover:bg-gray-400 transition duration-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={clearCart}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mb-2"
          >
            Clear Cart
          </button>
          <button
            onClick={toggleCart}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default CartPanel

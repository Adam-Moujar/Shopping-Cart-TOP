import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

const Product = () => {
  const { id } = useParams() 
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1) 
  const { addToCart } = useCart() 
  const navigate = useNavigate()  

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error))
  }, [id])

  if (!product) return <div className="text-center py-10">Loading...</div>

  const handleAddToCart = () => {
    addToCart(product, quantity) 
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{product.title}</h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex-1">
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-6">${product.price}</p>

            <div className="flex items-center space-x-6 mb-6">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-200"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-200"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate(-1)} 
              className="mt-6 text-blue-600 hover:text-blue-800 transition duration-200"
            >
              &larr; Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
      })
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  return (
 <div className="p-4">
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search for products..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>

  <div className="mb-4">
    <select
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      <option value="">All Categories</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="women's clothing">Women's Clothing</option>
      <option value="jewelery">Jewelry</option>
      <option value="electronics">Electronics</option>
    </select>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filteredProducts.map((product) => (
      <div
        key={product.id}
        className="flex flex-col justify-between border p-4 rounded-lg shadow-md h-full"
      >
        <Link to={`/product/${product.id}`} className="block mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain mb-4"
          />
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          </div>
        </Link>
        <div>
        <div className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded mb-4 flex items-center justify-center h-16">
          ${product.price}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-auto"
        >
          Add to Cart
        </button>
      </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Shop

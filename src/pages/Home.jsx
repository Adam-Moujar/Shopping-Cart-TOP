import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 bg-gradient-to-b from-blue-50 to-white">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fadeInUp">
            Welcome to MockCart 🛒
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 animate-fadeInUp delay-100">
            Discover awesome products at unbeatable prices! Head over to the Shop page to start browsing.
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out animate-fadeInUp"
          >
            Shop Now!
          </Link>
        </div>
      )
  }
  
  export default Home
  
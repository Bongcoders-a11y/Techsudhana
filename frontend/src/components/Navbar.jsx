const Navbar = () => {
    return (
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900">FakeNewsDetector</span>
          </div>
  
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </div>
  
          <button className="btn btn-primary hidden md:block">Sign Up</button>
  
          <button className="md:hidden text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  
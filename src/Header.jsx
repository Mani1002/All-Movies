import { Link } from "react-router-dom"; 
import { useState, useRef, useEffect } from "react";

function Header({ setMovies, setError }) {
  const [showSearch, setShowSearch] = useState(false);
  const [canShowIcon, setCanShowIcon] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const API_KEY = "63df517e";

  // 🔍 Search logic
  const searchMovies = async () => {
    if (!query) return;
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setMovies([]);
      setError("Search failed");
    }
  };

  // 🖱️ Close search if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 📜 Scroll listener
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex flex-col sm:flex-row justify-between items-center px-6 py-4 fixed top-0 w-full z-50 transition-colors duration-500
        ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"}
      `}
    >
      {/* 🎬 Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-13 h-13 rounded-full overflow-hidden">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6567/6567926.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-[#89ffb8] via-[#aefea6] to-[#d6fc91] bg-clip-text text-transparent">
        Search Movies and Web Series
        </span>
      </div>

      {/* 👉 Right section */}
      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
        {/* 🔎 Search bar */}
        <div ref={searchRef} className="relative flex flex-row-reverse">
          {canShowIcon && (
            <button
              onClick={() => {
                setShowSearch(true);
                setCanShowIcon(false);
              }}
              className="text-lg cursor-pointer"
            >
              {/* 🔍 Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 
                  0 1 0 5.196 5.196a7.5 7.5 
                  0 0 0 10.607 10.607Z"
                  className="fill-blue-[#d6fc91] stroke-[#d6fc91] stroke-4"
                />
              </svg>
            </button>
          )}

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className={`ml-2 h-10 bg-gray-900 focus:outline-white px-4 text-white
              transition-all duration-500 ease-in-out
              ${showSearch ? "w-72 opacity-100" : "w-0 opacity-0"}
            `}
            onKeyDown={(e) => e.key === "Enter" && searchMovies()}
            onTransitionEnd={() => {
              if (!showSearch) setCanShowIcon(true);
            }}
          />
        </div>

        {/* 🏠 Nav Links */}
        <Link
          to="/HomePage"
          className="px-3 py-1 text-3xl font-bold bg-gradient-to-r from-[#89ffb8] via-[#aefea6] to-[#d6fc91] bg-clip-text text-transparent"
        >
         Home
        </Link>
        <Link
          to="/FavouritePage"
          className="mr-13 text-3xl font-bold bg-gradient-to-r from-[#89ffb8] via-[#aefea6] to-[#d6fc91] bg-clip-text text-transparent"
        >
          My List
        </Link>
      </div>
    </header>
  );
}

export default Header;

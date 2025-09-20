import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavouritePage from "./FavouritePage";
import MovieDetails from "./MovieDetails";
import HomePage from "./HomePage";
import Header from "./Header";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // 🔑 OMDb API key 
  const API_KEY = "63df517e";

  // 🎬 Default movies fetch (homepage load)
  useEffect(() => {
    async function fetchDefaultMovies() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`
        );
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
        setError("Failed to fetch default movies");
      }
    }

    fetchDefaultMovies();
  }, []);

  return (
    <div className="bg-black text-white">
      <BrowserRouter>
        {/* 🟢 HEADER: search bar + nav links */}
        <Header setMovies={setMovies} setError={setError} />

        <Routes>
          {/* 🏠 HomePage — default movies list */}
          <Route
            path="/"
            element={<HomePage movies={movies} error={error} />}
          />
          <Route
            path="/HomePage"
            element={<HomePage movies={movies} error={error} />}
          />

          {/* ⭐ Favourites page (localStorage integration planned) */}
          <Route path="/FavouritePage" element={<FavouritePage />} />

          {/* 📄 Movie details page (fetch by ID) */}
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

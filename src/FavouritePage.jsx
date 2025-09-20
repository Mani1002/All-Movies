import { useState, useEffect } from "react";
import MovieCart from "./MovieCart";

function FavouritePage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // 🗂️ Fetch favourites from localStorage
    const storedList = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedList);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="px-15 py-10 ">
        {/* 📌 Sticky Heading */}
        <h1 className="font-bold text-3xl mb-6 sticky top-16 z-40 py-7">
          My List
        </h1>

        {favourites.length === 0 ? (
          // ℹ️ Empty State
          <p className="text-gray-400">No movies added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-23">
            {favourites.map((movie) => (
              <MovieCart key={movie.id} movie={movie} />
              // ⭐ NOTE: "movie.id" only works if your object has `id`
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritePage;

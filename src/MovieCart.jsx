import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MovieCart({ movie }) {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    // 🗂️ Check if current movie already in favourites
    const storedList = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(storedList.some((m) => m.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavourite = () => {
    let storedList = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFavourite) {
      // ❌ Remove from favourites
      storedList = storedList.filter((m) => m.imdbID !== movie.imdbID);
      setIsFavourite(false);
    } else {
      // ✅ Add to favourites
      storedList.push(movie);
      setIsFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(storedList));
  };

  return (
    <div className="relative group overflow-visible rounded-md cursor-pointer transform transition duration-500 hover:scale-125 hover:z-50 origin-bottom">
      {/* 🎬 Movie Poster */}
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x400?text=No+Image"
        }
        alt={movie.Title}
        className="w-full h-100 object-cover rounded-md"
      />

      {/* 🖼️ Overlay (on hover) */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          {/* ⭐ Favourite toggle button */}
          <button
            onClick={toggleFavourite}
            className={`bg-gray-800 p-2 rounded-full cursor-pointer transition
              ${isFavourite ? "" : "hover:rotate-180 hover:bg-gray-700"}
            `}
          >
            {isFavourite ? (
              // ✅ Tick Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              // ➕ Plus Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            )}
          </button>

          {/* 🔗 Navigate to Details */}
          <button
            onClick={() => navigate(`/movies/${movie.imdbID}`)}
            className="bg-gray-800 p-2 rounded-full transform transition duration-500 hover:rotate-180 cursor-pointer"
          >
            {/* ⬆️ Navigate Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>

        {/* 🎞️ Movie Title */}
        <p className="text-xl text-gray-300 font-semibold text-center">
          {movie.Title}
        </p>
      </div>
    </div>
  );
}

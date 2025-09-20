import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DetailPagehero({ movie }) {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  // 🔎 Check if movie already exists in localStorage favourites
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(storedList.some((m) => m.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  // 🔄 Toggle favourite movie (Add / Remove in localStorage)
  const toggleFavourite = () => {
    let storedList = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFavourite) {
      // ❌ Remove movie from list
      storedList = storedList.filter((m) => m.imdbID !== movie.imdbID);
      setIsFavourite(false);
    } else {
      // ✅ Add movie to list
      storedList.push(movie);
      setIsFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(storedList));
  };

  return (
    <section className="relative h-screen flex bg-black text-white">
      {/* 🎬 Poster (Left Side) */}
      <div className="h-[70vh] w-[50vh] ml-15 mt-30">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={movie.Title}
          className="h-full w-full object-cover rounded-md shadow-lg"
        />
      </div>

      {/* 📝 Movie Details (Right Side) */}
      <div className="flex-1 relative p-10 mt-40">
        {/* 🎯 Title */}
        <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>

        {/* 📌 Info line */}
        <p className="text-gray-300 mb-3 italic">
          {movie.Genre} • {movie.Runtime} • {movie.Year}
        </p>

        {/* 📖 Plot */}
        <p className="mb-4 text-lg leading-relaxed">{movie.Plot}</p>

        {/* ⭐ Extra Info */}
        <div className="flex flex-wrap gap-6 mb-6">
          
          <p>
            <span className="font-bold">🎭 Actors :</span> {movie.Actors}
          </p>
          <p>
            <span className="font-bold">🎬 Director :</span> {movie.Director}
          </p>
          <p>
            <span className="font-bold">📝 Writer :</span> {movie.Writer}
          </p>
          <p>
            <span className="font-bold">🏆 Awards :</span> {movie.Awards}
          </p>
          <p>
            <span className="font-bold">🈯 Language :</span> {movie.Language}
          </p>
          <p>
            <span className="font-bold">🌍 Country :</span> {movie.Country}
          </p>
          <p>
            <span className="font-bold">⭐ IMDB-Rating :</span> {movie.imdbRating}
          </p>
          <p>
            <span className="font-bold">🗳️ IMBD-Votes :</span> {movie.imdbVotes}
          </p>
          <p>
            <span className="font-bold">🆔 IMDB-ID :</span> {movie.imdbID}
          </p>
          <p>
            <span className="font-bold">🎥 Type :</span> {movie.Type}
          </p>
        </div>

        {/* 🎮 Action Buttons */}
        <div className="flex gap-4 mt-6">
          {/* ▶ Play Button */}
          <button className="bg-[#F28500] px-5 py-2 rounded-full hover:bg-[#ff9933] transition flex gap-2 items-center cursor-pointer">
            <span>
              {/* ▶ Play SVG */}
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </span>
            <span>Play</span>
          </button>

          {/* ➕ / ✅ My List Button */}
          <button
            onClick={toggleFavourite}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition cursor-pointer ${
              isFavourite
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {isFavourite ? (
              <>
                {/* ✅ Tick Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                {/* ➕ Plus Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>My List</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ❌ Close Button (Go Back Home) */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 right-4 z-50 p-2 bg-white/80 rounded-full hover:bg-white transition flex items-center justify-center"
      >
        {/* ❌ Close SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </section>
  );
}

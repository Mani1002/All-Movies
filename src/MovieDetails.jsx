import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPagehero from "./DetailPagehero";

// 🔑 Your OMDB API Key
const API_KEY = "63df517e"; 

export default function MovieDetails() {
  // 🆔 Get movie id from URL (ex: /movie/tt1234567)
  const { id } = useParams(); 

  // 🎬 State to store movie data
  const [movie, setMovie] = useState(null);

  // ⏳ Loading state (to show spinner/text until data comes)
  const [loading, setLoading] = useState(true);

  // 📡 Fetch movie details from OMDB API when component mounts
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ If response is correct
        if (data.Response === "True") {
          setMovie(data);
        } else {
          // ❌ If movie not found
          setMovie(null);
        }
      })
      .catch(() => setMovie(null)) // 🚨 Handle network/API errors
      .finally(() => setLoading(false)); // ⏱️ Stop loading
  }, [id]);

  // 🌀 Show loading text while fetching
  if (loading) return <p className="text-white">Loading...</p>;

  // ❌ Show error if movie not found
  if (!movie) return <p className="text-red-500">Movie not found!</p>;

  return (
    <div className="bg-black text-white">
      {/* 🎬 Movie Hero Section (Poster, Title, Details etc.) */}
      <DetailPagehero movie={movie} />
    </div>
  );
}

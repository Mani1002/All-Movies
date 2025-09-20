import HomePagehero from "./HomePagehero";
import MovieSection from "./MovieSection";

function HomePage({ movies, error }) {
  return (
    <div className="bg-black text-white pt-20">
      {/* 🎥 Hero Section */}
      <HomePagehero />

      {/* 🎬 Movie list section (fetched results ) */}
      <MovieSection movies={movies} error={error} />

    </div>
  );
}

export default HomePage;

import MovieCart from "./MovieCart";

export default function MovieSection({ movies = [], error }) {
  return (
    <section className="px-15 py-28 bg-black text-white">
      {/* 🎬 Section Heading */}
      <h2 className="px-3 py-1 text-3xl font-bold bg-gradient-to-r 
        from-[#89ffb8] via-[#aefea6] to-[#d6fc91] bg-clip-text text-transparent mb-4">
        Movies List
      </h2>

      {/* ⚠️ Error message */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* 🎥 Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCart key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}

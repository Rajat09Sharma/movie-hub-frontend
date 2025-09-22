
import { useState } from "react";
import { DarkButton } from "../components/DarkButton";
import { LightButton } from "../components/LightButton";
import { useNavigate } from "react-router-dom";
import { MovieModal } from "../components/MovieModal";

// const moviesMock = [
//   {
//     title: "Inception",
//     description: "A thief who enters dreams to steal secrets gets trapped in a layered reality.",
//     recommendedBy: "Alice",
//     poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
//   },
//   {
//     title: "Interstellar",
//     description: "Explorers travel through a wormhole to save humanity.",
//     recommendedBy: "Bob",
//     poster: "https://m.media-amazon.com/images/I/71yAzR5s8-L._AC_SY679_.jpg"
//   },
//   {
//     title: "The Dark Knight",
//     description: "Batman faces the Joker in Gotham’s darkest hour.",
//     recommendedBy: "Charlie",
//     poster: "https://m.media-amazon.com/images/I/51EbJjlL2wL._AC_.jpg"
//   }
// ];

export const HomePage = () => {
  // const [movies, setMovies] = useState([]);

  const [openMovieModal, setMovieModal] = useState(false);

  const navigate = useNavigate();
  const handleRecomendMovieClick = () => {
    navigate("/movies");
  }



  return (
    <>

      <div className="bg-gray-950 text-white">
        <div className="h-[80vh] flex flex-col justify-center items-center bg-gradient-to-r from-black via-gray-900 to-black text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover & Share Great Movies 🎬
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
            MovieHub lets you recommend movies you love and explore hidden gems shared by others.
          </p>
          <div className="flex-col gap-4 space-y-3 justify-center items-center md:flex-row md:space-y-0 md:space-x-9">
            <DarkButton onClick={() => handleRecomendMovieClick()}>Start Exploring</DarkButton>
            <LightButton onClick={() => setMovieModal(true)} >Recommend a Movie</LightButton>
          </div>
        </div>
      </div>
      <MovieModal open={openMovieModal} onClose={() => setMovieModal(false)} />
    </>
  );
};


{/* <div className="py-16 bg-gray-900 px-6">
  <h2 className="text-3xl font-bold mb-8 text-center">What People Are Watching 🍿</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {movies.map((movie, idx) => (
      <div
        key={idx}
        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
      >
        <div className="p-4 space-y-5">
          <div className="mb-3 flex justify-between">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <div className="flex gap-2">
              <p>up</p>
              <p>down</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">{movie.description}</p>
          <p className="text-gray-500 text-xs mt-3 italic">
            Recommended by {movie.recommendedBy}
          </p>
        </div>
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-10">
    <DarkButton onClick={() => handleRecomendMovieClick()}>See All Recommendations</DarkButton>
  </div>
</div> */}
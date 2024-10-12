import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Plus, StarIcon, TriangleAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToWatchList } from "./redux/moviesReducer";

function MovieDetailsPage() {
  const { id } = useParams();
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies[0].find((el) => el.id === parseInt(id));
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchList);
  const mode = useSelector(state => state.movies.mode)
  return (
    <div className={mode ? " " : "dark"}>
    <Card className="w-full h-screen mx-auto overflow-hidden">
      <div className="relative h-64 md:h-96">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="relative z-10 -mt-16 md:-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="w-32 md:w-48 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{movie.title}</h1>
            <p className="text-muted-foreground mt-2">
                Releqse date : 
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className=" items-center mt-2 space-x-2 ">
              <div className="flex items-center mt-2 gap-1">
                {new Array(5).fill(null).map((_, pos) => (
                  <StarIcon
                    key={pos}
                    className={
                      pos < Math.round(movie.vote_average / 2)
                        ? "text-yellow-400 w-5 h-5 fill-yellow-400"
                        : "text-gray-200 w-5 h-5 fill-gray-200"
                    }
                  />
                ))}{" "}
                {(movie.vote_average / 2).toFixed(2)}/5
                <span className="text-muted-foreground">
                  ({(movie.vote_count / 2).toFixed(0)} votes)
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{movie.overview}</p>
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-2 mt-4">
              {movie.genre_ids.map((genreId) => (
                <span key={genreId} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {genreMap[genreId] || "Unknown Genre"}
                </span>
              ))}
            </div> */}
          </div>
          {watchlist.find((el) => el.id === movie.id) ? (
            <Button>
              <TriangleAlert  className="mr-2 h-4 w-4" /> Already in watch List
            </Button>
          ) : (
            <Button onClick={() => dispatch(addToWatchList(movie))}>
              <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
            </Button>
          )}
        </div>
      </div>
    </Card>
    </div>
  );
}

//     <Card className="mt-8">
//       <CardContent>
//         <h2 className="text-xl font-semibold mb-4">Cast</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {cast.map((actor) => (
//             <div key={actor.id} className="flex flex-col items-center text-center">
//               <img src={actor.image} alt={actor.name} className="w-24 h-24 rounded-full object-cover mb-2" />
//               <h3 className="font-medium">{actor.name}</h3>
//               <p className="text-sm text-muted-foreground">{actor.character}</p>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//

// function RelatedMovies() {
//   const relatedMovies = [
//     { id: 1, title: "Deadpool", image: "/placeholder.svg?height=200&width=150" },
//     { id: 2, title: "Deadpool 2", image: "/placeholder.svg?height=200&width=150" },
//     { id: 3, title: "Logan", image: "/placeholder.svg?height=200&width=150" },
//     { id: 4, title: "X-Men Origins: Wolverine", image: "/placeholder.svg?height=200&width=150" },
//   ]

//   return (
//     <Card className="mt-8">
//       <CardContent>
//         <h2 className="text-xl font-semibold mb-4">Related Movies</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {relatedMovies.map((movie) => (
//             <div key={movie.id} className="text-center">
//               <img src={movie.image} alt={movie.title} className="w-full h-auto rounded-lg mb-2" />
//               <h3 className="font-medium">{movie.title}</h3>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

export default MovieDetailsPage;

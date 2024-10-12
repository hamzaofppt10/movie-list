import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2, Eye } from "lucide-react"

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removFromWatchList } from "./redux/moviesReducer";

const WatchList = () => {
    const watchlist = useSelector(state => state.movies.watchList)
    const dispatch = useDispatch()
     const mode = useSelector(state => state.movies.mode)
    return (
      <div className={mode ? " " : "dark"}>
      <main className="container mx-auto px-4 py-8 bg-secondary text-foreground min-h-screen flex items-center justify-center">
        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">
              Your watchlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies to your watchlist to see them here!
            </p>
            <Link to="/">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
              <Card key={movie.id} className="flex flex-col">
                <CardContent className="p-4">
                  <div className="aspect-[2/3] relative mb-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                  <p className="text-muted-foreground mb-2">
                    Release Date:{" "}
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm line-clamp-3">{movie.overview}</p>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto p-4">
                  <Link to={`/details/${movie.id}`}>
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => dispatch(removFromWatchList((movie.id)))}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchList;

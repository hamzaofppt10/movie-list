import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/moviesReducer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Home = () => {
  const movies = useSelector((state) => state.movies.movies)
  const dispatch = useDispatch();
  const api_key = "8bd47a15fc6a5e16f7199b7c9907e363";
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [ratingFilter, setRatingFilter] = useState([0]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
      .then((res) => {
        console.log(res.data.results);
        dispatch(fetchMovies(res.data.results));
      });
  }, [dispatch]);

  useEffect(() => {
    console.log("movies", movies);
  }, [movies]);

  const mode = useSelector(state => state.movies.mode);

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const filteredMovies = movies[0]?.filter((movie) => {
    const genreMatch = selectedGenre === "all" || movie.genre_ids.includes(parseInt(selectedGenre));
    const ratingMatch = movie.vote_average >= ratingFilter[0]*2;
    return genreMatch && ratingMatch;
  });

  return (
    <div className={mode ? " " : "dark"}>
      <div className="p-4 bg-secondary">
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <Select onValueChange={(value) => setSelectedGenre(value)} >
            <SelectTrigger className="w-full sm:w-[180px] text-foreground border-foreground">
              <SelectValue placeholder="Select Genre"/>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-foreground">
            <span className="text-sm font-medium">Min Rating:</span>
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={ratingFilter}
              onValueChange={setRatingFilter}
              className="w-full sm:w-[200px]"
            />
            <span className="text-sm font-medium">{ratingFilter[0]}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMovies &&
            filteredMovies.map((movie) => (
              <Card
                className="w-full overflow-hidden"
                key={movie.id}
              >
                <CardHeader className="">
                  <div className="">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full rounded-lg shadow-lg"
                    />
                    <div>
                      <CardTitle className="text-2xl mt-2 font-bold">
                        {movie.title}
                      </CardTitle>
                      <div className="flex items-center mt-2 gap-1">
                        {new Array(5).fill(null).map((_, pos) => (
                          <StarIcon
                            key={pos}
                            className={
                              pos < movie.vote_average / 2
                                ? "text-yellow-400 w-5 h-5 fill-yellow-400"
                                : "text-gray-200 w-5 h-5 fill-gray-200"
                            }
                          />
                        ))} {(movie.vote_average/2).toFixed(2)}/5
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {movie.genre_ids.map((genreId) => (
                          <Badge key={genreId} variant="secondary">
                            {genres.find(g => g.id === genreId)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button><Link to={`details/${movie.id}`}>Read more</Link></Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
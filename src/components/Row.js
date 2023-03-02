import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";

function Row({ title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
    return response;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 50;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>

        <div id={id} className="row__posters">
          {movies &&
            movies.map((movie) => {
              return (
                <img
                  key={movie.id}
                  className="row__poster"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.name}
                  // onClick={()=>handleClick(movie)}
                />
              );
            })}
        </div>

        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 50;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </div>
  );
}

export default Row;

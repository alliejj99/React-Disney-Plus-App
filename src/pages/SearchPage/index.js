import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const searchTerm = new URLSearchParams(useLocation().search);

  const fetchSearchMovies = useCallback(async (queryData) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${queryData}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovies(searchTerm);
    }
  }, [fetchSearchMovies, searchTerm]);

  return (
    <React.Fragment>
      {searchResults.length > 0 ? (
        <section className="search-container">
          {searchResults.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== "person") {
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  <div
                    className="movie__column-poster"
                    onClick={() => navigate(`/${movie.id}`)}
                  >
                    <img
                      src={movieImageUrl}
                      alt="movie"
                      className="movie__poster"
                    />
                  </div>
                </div>
              );
            }
          })}
        </section>
      ) : (
        <section className="no-results">
          <div className="no-results-text">
            <p>검색한 "{searchTerm && searchTerm}" 제목의 영화는 없습니다.</p>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default SearchPage;

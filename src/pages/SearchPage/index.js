import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  const fetchSearchMovies = useCallback(
    async (searchTerm) => {
      try {
        const response = await axios.get(
          `search/multi?include_adult=false&query=${searchTerm}`
        );
        setSearchResults(response.data.results);
        console.log(response, searchResults);
      } catch (error) {
        console.log("error");
      }
    },
    [searchResults]
  );

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovies(searchTerm);
    }
  }, [fetchSearchMovies, searchTerm]);

  return <div>SearchPage</div>;
};

export default SearchPage;

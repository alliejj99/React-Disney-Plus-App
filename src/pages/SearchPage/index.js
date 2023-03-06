import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchTerm = new URLSearchParams(useLocation().search);

  const fetchSearchMovies = useCallback(async (queryData) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${queryData}`
      );
      setSearchResults(response.data.result);
      console.log("response", response);
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovies(searchTerm);
    }
  }, [fetchSearchMovies, searchTerm]);

  return <div>searchpage</div>;
};

export default SearchPage;

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import requsts from "../api/request";
import axiosRequest from "../api/request";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const fetchData = async () => {
    // 현재 상영 영화 정보 전체 불러오기
    const request = await axiosInstance(axiosRequest.fetchNowPlaying);
    // 현재 상영 영화 정보 특정 아이디 불러오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보 가져오기
    const { data: movieDetail } = await axiosInstance.get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });

    setMovie(movieDetail);

    console.log(movie);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Banner</div>;
};

export default Banner;

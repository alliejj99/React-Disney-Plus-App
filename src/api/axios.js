import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "57e0e5a94e9c48b249891c93a5e8776e",
    languages: "ko-KR,en-US",
  },
});

export default instance;

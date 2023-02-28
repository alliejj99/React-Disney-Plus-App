import Nav from "./components/Nav";
import Category from "./components/Category";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/request";
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </Container>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  top: 72px;
  display: block;
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
  }
`;

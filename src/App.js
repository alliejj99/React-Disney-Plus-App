import Nav from "./components/Nav";
import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Nav />
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
  overflow-x: hidden;

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

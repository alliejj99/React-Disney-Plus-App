import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = () => {
  const [handleShow, setHandleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setHandleShow(true);
      } else {
        setHandleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper show={handleShow}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  z-index: 3;
`;

const Logo = styled.div`
  display: inline-block;
  width: 80px;
  max-height: 70px;
  margin-top: 4px;
  padding: 0;
  font-size: 0px;

  img {
    display: block;
    width: 100%;
  }
`;

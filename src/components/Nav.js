import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const { pathname } = useLocation();
  const [handleShow, setHandleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setHandleShow(true);
    } else {
      setHandleShow(false);
    }
  }, []);

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      navigate(`/search/q=${e.target.value}`);
      console.log(pathname);
    },
    [navigate, pathname]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <NavWrapper show={handleShow}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <LoginStyle>Login</LoginStyle>
      ) : (
        <InputStyle
          value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="Movie Search"
        />
      )}
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

const InputStyle = styled.input`
  position: fixed;
  left:50%;
  padding: 5px
  border: none;
  border-radius: 5px;
  color: white;
  background-color: rgba(0, 0, 0, 0.582);
  transform: translate(-50%, 0);
`;

const LoginStyle = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  trabsition: all 0.3s ease 0s;

  &:hover {
    border-color: tran;
    color: black;
    background-color: #f9f9f9;
  }
`;

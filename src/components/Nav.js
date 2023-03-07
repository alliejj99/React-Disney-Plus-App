import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Nav = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      navigate(`/search/q=?${e.target.value}`); // => search Page로 이동
    },
    [navigate]
  );

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const handleAuth = useCallback(() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 인증된 유저일 경우 로그인 페이지 대신 메인페이지로 "바로"이동
      if (user) {
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <LoginStyle onClick={() => handleAuth()}>Login</LoginStyle>
      ) : (
        <React.Fragment>
          <InputStyle
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="Movie Search"
          />
          <SignOut>
            <UserImage src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={() => handleLogOut()}>Sign Out</span>
            </DropDown>
          </SignOut>
        </React.Fragment>
      )}
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  diplay: inline-block;

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
  cursor: pointer;

  &:hover {
    border-color: tran;
    color: black;
    background-color: #f9f9f9;
  }
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  width: 100%;
  font-size: 14px;
  letter-spacing: 3px;
  padding: 10px;
  background-color: rgba(19, 19, 19, 0.8);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  cursor: pointer;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

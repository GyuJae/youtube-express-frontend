import React from "react";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 20px 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const NavList = styled.ol`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeItem = styled.li`
  font-size: 38px;
  color: ${(props) => props.theme.colors.red};
`;

const YoutubeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const YoutubeTitle = styled.h1`
  color: ${(props) => props.theme.colors.black};
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;
`;

const LoginItem = styled.li`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 10px 8px;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    filter: brightness(90%);
  }
`;

const LoginTitle = styled.h2`
  color: ${(props) => props.theme.colors.white};
`;

const Header = () => {
  return (
    <Nav>
      <NavList>
        <HomeItem>
          <YoutubeLink to="/">
            <FaYoutube />
            <YoutubeTitle>Youtube</YoutubeTitle>
          </YoutubeLink>
        </HomeItem>
        <LoginItem>
          <Link to="/login">
            <LoginTitle>로그인</LoginTitle>
          </Link>
        </LoginItem>
      </NavList>
    </Nav>
  );
};

export default Header;

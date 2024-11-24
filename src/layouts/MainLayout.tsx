// Layout.js
import { NavBar } from "features/navBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding-top: 60px; // Same as the NavBar height
`;

function Layout() {
  return (
    <>
      <NavBar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

export default Layout;

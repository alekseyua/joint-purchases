import React from 'react'
import { Outlet } from "react-router";
import Header from '~/Module/Header/Header';
import Container from '~/UI/Blocks/Container';
import CorporationBadge from '~/UI/CorporationBadge/CorporationBadge';


const Layout:React.FC = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <CorporationBadge />
    </Container>
  );
}

export default Layout
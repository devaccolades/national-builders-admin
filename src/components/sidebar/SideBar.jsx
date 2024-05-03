import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// logo
import logo from '../../assets/images/logo/national-builders-logo.svg'
// Icons
import enguiryIcon from '../../assets/icons/enq-list.svg'
import homeIcon from '../../assets/icons/home.svg'
function SideBar() {
  const navList = [
    {
      id: 1,
      title: "Enquires",
      image: enguiryIcon,
      route: "/enquiry",
    },
  ]

  const navigate = useNavigate()
  return (
    <Section>
      <Logo onClick={() => navigate('/')}  >
        <img src={logo} alt="" />
      </Logo>
      <MainTitle to="/" className='grid grid-cols-[5rem,0.3rem,1fr]'>
        <LogoMain className='flex justify-center'>
          <img src={homeIcon} className='w-5' alt="" />
        </LogoMain>
        <p className='-ms-4 text-gray-800'>|</p>
        <Span className={``}>Dashboard</Span>
      </MainTitle>
      <NavList>
        {navList.map((item, index) => (
          <Nav to={item.route} key={index}>
            <Icon>
              <img src={item.image} alt={item.title} />
            </Icon>
            <Text className={``}>
              {item.title}
            </Text>
          </Nav>
        ))}
      </NavList>
    </Section>
  )
}

export default SideBar

const Section = styled.aside`
  background-color: #1b1d21;
  color: var(--textcolor);
  font-family: 'mont-regular';
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  padding: 40px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  margin: 0 auto;
  margin-bottom: 50px;
`;
const MainTitle = styled(Link)`
  background-color: #232327;
  padding: 8px 10px;
  cursor: pointer;
  border: 2px solid #2b2d30;
  border-radius: 20px;
  margin-bottom: 30px;
`;
const LogoMain = styled.div`
`;
const Span = styled.div`
  color: #ffffff8e;
  &.active {
    color: var(--lightblue);
  }
`;
const NavList = styled.div`
  padding: 16px;
  font-size: 14px;
`;
const Nav = styled(Link)`
  display: flex;
  text-decoration: none;
  cursor: pointer;
  height: 60px;
  position: relative;
  &::after {
    position: absolute;
    width: 100%;
    background-color: #2b2d30;
    content: "";
    height: 1px;
    bottom: 18px;
  }
`;
const Icon = styled.div`
  margin-right: 10px;
  width: 20px;
  color: #ffffff8e;
`;
const Text = styled.div`
`;
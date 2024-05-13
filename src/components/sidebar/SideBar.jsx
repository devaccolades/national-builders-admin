import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// logo
import logo from '../../assets/images/logo/national-builders-logo.svg'
// Icons
import homeIcon from '../../assets/icons/home.svg'
import homeIconBlue from '../../assets/icons/home-blue.svg'
import enguiryIcon from '../../assets/icons/enq-list.svg'
import enguiryIconBlue from '../../assets/icons/enq-list-blue.svg'
import projectIcon from '../../assets/icons/projects.svg'
import projectIconBlue from '../../assets/icons/projects-blue.svg'
import contactIcon from '../../assets/icons/contact.svg'
import contactIconBlue from '../../assets/icons/contact-blue.svg'
import amenitiesIcon from '../../assets/icons/amenities.svg'
import amenitiesIconBlue from '../../assets/icons/amenities-blue.svg'
import rentalsIcon from '../../assets/icons/rentals.svg'
import rentalsIconBlue from '../../assets/icons/rentals-blue.svg'
import keyhandoverIcon from '../../assets/icons/keyhandover.svg'
import keyhandoverIconBlue from '../../assets/icons/keyhandover-blue.svg'
import testimoniealIcon from '../../assets/icons/testimonials.svg'
import testimoniealIconBlue from '../../assets/icons/testimonials-blue.svg'
import blogsIcon from '../../assets/icons/blogs.svg'
import blogsIconBlue from '../../assets/icons/blogs-blue.svg'
import NewAndEventsIcon from '../../assets/icons/newsandevents.svg'
import NewAndEventsIconBlue from '../../assets/icons/newsandevents-blue.svg'
import seoIcon from '../../assets/icons/seo.svg'
import seoIconBlue from '../../assets/icons/seoblue.svg'

function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navList = [
    {
      id: 1,
      title: "Enquires",
      image: currentPath === '/enquiry' ? enguiryIconBlue : enguiryIcon,
      route: "/enquiry",
    },
    {
      id: 2,
      title: "Project",
      image: currentPath === '/project' ? projectIconBlue : projectIcon,
      route: "/project",
    },
    {
      id: 3,
      title: "Rentals",
      image: currentPath === '/rentals' ? rentalsIconBlue : rentalsIcon,
      route: "/rentals",
    },
    {
      id: 4,
      title: "Amenities",
      image: currentPath === '/amenities' ? amenitiesIconBlue : amenitiesIcon,
      route: "/amenities",
    },
    
    {
      id: 5,
      title: "Testimonieals",
      image: currentPath === '/testimonieals' ? testimoniealIconBlue : testimoniealIcon,
      route: "/testimonieals",
    },
    
    {
      id: 5,
      title: "Key Handover",
      image: currentPath === '/key-handover' ? keyhandoverIconBlue : keyhandoverIcon,
      route: "/key-handover",
    },

    {
      id: 6,
      title: "Blogs",
      image: currentPath ===  '/blogs' ? blogsIconBlue : blogsIcon,
      route: "/blogs",
    },
    {
      id: 7,
      title: "News & Events",
      image: currentPath === '/news-and-events' ? NewAndEventsIconBlue : NewAndEventsIcon,
      route: "/news-and-events",
    },
     
     
    {
      id: 8,
      title: "Contact",
      image: currentPath === '/contact' ? contactIconBlue : contactIcon,
      route: "/contact",
    },
    {
      id: 9,
      title: "Seo",
      image: currentPath === '/seo' ? seoIconBlue : seoIcon,
      route: "/seo",
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
          <img src={currentPath === '/' ? homeIconBlue : homeIcon} className='w-5' alt="" />
        </LogoMain>
        <p className='-ms-4 text-gray-800'>|</p>
        <Span className={`${currentPath === '/' ? "active"  :""}`}>Dashboard</Span>
      </MainTitle>
      <NavList>
        {navList.map((item, index) => (
          <Nav to={item.route} key={index}>
            <Icon>
              <img src={item.image} alt={item.title} />
            </Icon>
            <Text className={`${currentPath === item.route ? "text-[#519bf4]" : ""}`}>
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
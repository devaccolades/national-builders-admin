import React from 'react'
import styled from 'styled-components'
import SideBar from '../components/sidebar/SideBar'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/sidebar/TopBar';

function Layout() {
    return (
        <Section>
            <SideBar />
            <Right>
                <TopBar/>
                <Outlet />
            </Right>
        </Section>
    );
}


export default Layout

const Section = styled.section`
    display: grid;
    grid-template-columns: 19rem 1fr;
`
const Right = styled.div`
width: 80%;
margin: 0 auto;
font-family: 'mont-regular';
color: var(--textcolor);
    height: 100vh;
    overflow-y: auto;
    display: grid;
    grid-template-rows: 10rem 1fr;
    gap: 2rem;
    &::-webkit-scrollbar {
    display: none;
  }
`
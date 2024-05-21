import React from 'react'
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import ProjectCounts from '../components/home/ProjectCounts';
import Awards from '../components/home/Awards';
import Videos from '../components/home/Videos';

function Home() {
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Home - Content"} />
            </div>
            <ProjectCounts />
            <Awards/>
            <Videos/>
        </Section>
    )
}

export default Home

const Section = styled.div``
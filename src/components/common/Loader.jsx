import { Spinner } from '@material-tailwind/react';
import React from 'react'
import styled from 'styled-components';

function Loader() {
  return (
    <Section>
        <Spinner className="h-6 w-6" />
    </Section>
  )
}

export default Loader

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
import React from 'react'
import bgImage from '../assets/images/error/error.jpg'
import styled from 'styled-components';

function Error() {
  return (
    <Section>PageNotFound</Section>
  )
}

export default Error

const Section = styled.div`
height: 75vh;
width: 100%;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

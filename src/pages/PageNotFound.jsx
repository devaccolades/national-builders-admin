import React from 'react'
import styled from 'styled-components'
import bgImage from '../assets/images/error/error.svg'
function PageNotFound() {
  return (
    <Section></Section>
  )
}

export default PageNotFound

const Section = styled.div`
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: center;
`;

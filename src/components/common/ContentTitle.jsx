import React from 'react'
import styled from 'styled-components'

function ContentTitle({text}) {
  return (
    <Title>{text}</Title>
  )
}

export default ContentTitle

const Title = styled.h3`
margin-bottom: 50px;
    color: white;
    font-size: 18px;   
 
`

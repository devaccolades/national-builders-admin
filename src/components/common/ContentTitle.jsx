import React from 'react'
import styled from 'styled-components'

function ContentTitle({mb=0,text}) {
  return (
    <Title className={`mb-[${mb}px]`}>{text}</Title>
  )
}

export default ContentTitle

const Title = styled.h3 `
    color: white;
    font-size: 18px;   
 
`

import React from 'react'
import styled from 'styled-components'
import ContentTitle from '../../common/ContentTitle'

function ImageList() {
  return (
    <Section>
      <ImageLising>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Images"} />
          <Button className='flex justify-end items-start'>
                    <button>Add Images</button>
                </Button>
        </div>
        fdafdsa
      </ImageLising>
      <FloorPlanList>
      <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Floor Plan"} />
          <Button className='flex justify-end items-start'>
                    <button>Add Floor Plan</button>
                </Button>
        </div>
        fdsafda
      </FloorPlanList>
    </Section>
  )
}

export default ImageList

const Section = styled.div`
`
const ImageLising = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 0 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-bottom: 5rem;
`
const FloorPlanList = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-bottom: 5rem;
`
const Button = styled.h3`
 button{
    padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--darkgrey);
    color: var(--lightblue);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
 }
`;
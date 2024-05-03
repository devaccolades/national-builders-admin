import React from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle';

function Dashboard() {
  return (
    <>
        <CountSection>
        <ContentTitle mb={50} text={"Dashboard"}/>
          <Cards>
            <Card>
              <CardTitle>Total Projects </CardTitle>
              <Count>1</Count>
            </Card>
          </Cards>
        </CountSection>
    </>
  )
}

export default Dashboard


const CountSection = styled.div`
`;

const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;
const Card = styled.div`
  background-color: #1b1d21;
  border: 1px solid #313335;
  width: 20%;
  height: 10rem;
  padding: 30px;
  border-radius: 20px;
`;
const Count = styled.h1`
  color: #519bf4;
  font-size: 50px;
  font-family: "mont-medium";
`;
const CardTitle = styled.h3`
  color: #a4a5a4;
  margin-bottom: 16px;
  font-size: 19px;
  @media all and (max-width: 1440px) {
    font-size: 16px;
  }
`;

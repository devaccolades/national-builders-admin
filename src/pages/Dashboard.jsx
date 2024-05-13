import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle';
import { getProjectCountApi } from '../services/services';
import { Spinner } from '@material-tailwind/react';

function Dashboard() {
  const [count, setCount] = useState(null)
  const fetchData = async () => {
    try {
      const res = await getProjectCountApi()
      const { StatusCode, data } = res.data;
      if (StatusCode === 6000) {
        setCount(data)
      } else {
        setCount(0)
      }
    } catch (error) {
      setCount(0)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <CountSection>
        <ContentTitle text={"Dashboard"} />
        {count === null ? (
          <Loader>
            <Spinner className="h-6 w-6" />
          </Loader>
        ):(
          <Cards>
            <Card>
              <CardTitle>Total Projects </CardTitle>
              <Count>{count}</Count>
            </Card>
          </Cards>
        )}

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

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;
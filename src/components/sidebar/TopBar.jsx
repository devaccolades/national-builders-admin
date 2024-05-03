import React from 'react'
import styled from 'styled-components'
import { BiLogOutCircle } from "react-icons/bi";

function TopBar() {
    return (
        <Section>
            <Title>Hello admin,</Title>
            <Logout >
                <Icon>
                    <BiLogOutCircle/>
                </Icon>
                <Span>Logout</Span>
            </Logout>
        </Section>
    )
}

export default TopBar

const Section = styled.div`
color: var(--textcolor);
display: flex;
align-items: end;
  justify-content: space-between;
  padding-bottom: 35px;
  border-bottom: 1px solid #313335;
`
const Title = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`;
const Logout = styled.div`
  display: flex;
  background-color: var(--darkgrey);
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;
const Icon = styled.div`
  color: #ccc;
  margin-right: 10px;
  border: 1px solid var(--bordercolor);
  width: 25px;
  height: 25px;
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
const Span = styled.div``;

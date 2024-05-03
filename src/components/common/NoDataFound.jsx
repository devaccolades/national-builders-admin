import React from "react";
import { styled } from "styled-components";
import noDataImg from "../../assets/images/common/folder.png";

function NoDataFound() {
  return (
    <Container>
      <Img>
        <img src={noDataImg} alt="no-data" />
      </Img>
    </Container>
  );
}

export default NoDataFound;

const Img = styled.div`
  width: 15%;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
  }
`;
const Container = styled.div`
  height: 300px;
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

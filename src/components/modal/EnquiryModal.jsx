import React, { useState } from 'react'
import styled from 'styled-components';

function EnquiryModal({ isModal, setModal, showData }) {
  return (
    <Container className={isModal && "active"}>
    <Overlay onClick={() => setModal(false)}></Overlay>
    <Modal>
        <div>
            <Heding>Enquiry Information</Heding>
            <Content className='rounded-[.5rem] p-6'>
            <div className='py-4 grid grid-cols-2'>
                <p>Date</p>
                <p>{showData?.enquiry_date}</p>
            </div>
            <div className='py-4 grid grid-cols-2'>
                <p>Name</p>
                <p>{showData?.name}</p>
            </div>
            <div className='py-4 grid grid-cols-2'>
                <p>Email</p>
                <p>{showData?.email}</p>
            </div>
            <div className='py-4 grid grid-cols-2'>
                <p>Phone</p>
                <p>{showData?.phone}</p>
            </div>
            <div className='py-4 grid grid-cols-2'>
                <p>Message</p>
                <p>{showData?.message}</p>
            </div>
            <div className='py-4 grid grid-cols-2'>
                <p>Project</p>
                <p>{showData?.project?.name}</p>
            </div>

            </Content>
            
        </div>
    </Modal>
  </Container>
  )
}

export default EnquiryModal

const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  &.active {
    transform: scale(1, 1);
    backdrop-filter: blur(4px);
  }
`;
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0px;
  width: 100%;
  z-index: 1000;
  min-height: 100vh;
  max-height: 100vh;
  filter: blur(1px);
`;
const Modal = styled.div`
  width: 90%;
  max-width: 736px;
  max-height: 100vh;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s;
  z-index: 1000;
  background: #232327;
  border-radius: 5px;
  overflow-y: hidden;
  box-shadow: 0px 3px 56px #000;
  overflow-y: scroll;
  background-color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    padding: 4rem;
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 1380px) {
    left: 58%;
  }
  @media all and (max-width: 1280px) {
    width: 550px;
  }
  @media all and (max-width: 1080px) {
    width: 500px;
  }
  @media all and (max-width: 980px) {
    width: 450px;
  }
  @media all and (max-width: 768px) {
    width: 400px;
  }
  @media all and (max-width: 640px) {
    width: 350px;
  }
  @media all and (max-width: 480px) {
    width: 330px;
  }
  @media all and (max-width: 360px) {
    width: 300px;
  }
`;

const Heding = styled.h3`
    font-size: 25px;
    text-align: center;
    margin-bottom: 1.5rem;
`

const Content = styled.div`
    background-color: #0d0d0e;
`
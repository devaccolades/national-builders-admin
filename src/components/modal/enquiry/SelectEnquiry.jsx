import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import { baseUrl } from '../../../api/api';

function SelectEnquiry({ isModal, setModal }) {
    const [errors, setErrors] = useState('')
    const [selected, setSelected] = useState('')

    const handleSelect = (event) => {
        setSelected(event.target.value);
    };


    const downloadEnquires = async () => {
        if (selected === '') {
            setErrors('Please select a option')
            setTimeout(() => {
                setErrors('');
            }, 2500)
            return
        }
        try {
            if (selected === 'enquiry') {
                const response = await axios.get(`${baseUrl}project/enquiry-download/`, {
                    responseType: 'blob',
                });
                const blobUrl = URL.createObjectURL(new Blob([response.data]));

                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', 'EnquiryData.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }else{
                const response = await axios.get(`${baseUrl}project/rentals-enquiry-download/`, {
                    responseType: 'blob',
                });
                const blobUrl = URL.createObjectURL(new Blob([response.data]));

                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', 'RentalsEnquiryData.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }


        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    return (
        <Container className={isModal && "active"}>
            <Overlay onClick={() => setModal(false)}></Overlay>
            <Modal>
                <div>
                    <Heding>Select Enquiry</Heding>
                    <div className='mb-8'>
                        <Select value={selected} onChange={handleSelect}>

                            <Option value='' disabled>Please select enquiry type</Option>
                            <Option value='enquiry'>Enquiry</Option>
                            <Option value='rentalsenquiry'>Rentals Enquiry</Option>
                        </Select>
                        <div className="text-red-500 text-sm pt-2 -mb-3">{errors}</div>
                    </div>
                    <SubmitButton>
                        <button onClick={() => setModal(false)} className='cancel'>Cancel</button>
                        <button onClick={downloadEnquires} className='submit'>Submit</button>
                    </SubmitButton>
                </div>
            </Modal>
        </Container>
    )
}

export default SelectEnquiry

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
const Select = styled.select`
  padding: 10px 20px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #5b5b5b;
  border: none;
  outline: none;
  color: #fff;
  /* text-transform: capitalize; */

`;

const Option = styled.option`
    /* text-transform: capitalize; */

`;

const SubmitButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    .submit{
        padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: white;
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    }
    .cancel{
        padding:10px 26px;
        font-size: 16px;
    text-align: center;
    background-color: var(--red);
    color: white;
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    }
`

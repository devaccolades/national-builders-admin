import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import NoDataFound from '../components/common/NoDataFound';
import { baseUrl } from '../api/api';

import EnquiryModal from '../components/modal/EnquiryModal';
import { EditEnquiryReadedApi, getEnquiryApi } from '../services/services';
import { Spinner } from '@material-tailwind/react';
// Icons
import { FaEye } from "react-icons/fa6";
import axios from 'axios';

function Enquiry() {
    const [isModal, setModal] = useState(false)
    const [data, setData] = useState(null)
    const [showData,setShowData] = useState('')

    const downloadEnquires = async() => {
        try {
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
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await getEnquiryApi()
            const { StatusCode, data } = res.data;
            if (StatusCode === 6000) {
                setData(data)
            } else {
                setData([])
            }
        } catch (error) {
            setData([])
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    const EnquiryReadUpdate = async (values)=>{
        try {
            const res = await EditEnquiryReadedApi({"is_read" : true},values.id)
            const { StatusCode } = res.data;
            if (StatusCode === 6000) {
              console.log('success');
              fetchData()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Enquiries"} />
                <Print className='flex justify-end items-start'>
                    <button className='bg-[lightblue]' onClick={downloadEnquires}>Print</button>
                </Print>
            </div>
            <TableSection>
            {data === null ? (
                    <Loader>
                        <Spinner className="h-6 w-6" />
                    </Loader>
                ) : data.length === 0 ? (
                    <NoDataFound />
                ) : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>SI.no</Th>
                            <Th>Date</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Message</Th>
                            <Th>Project</Th>
                            <Th>Show</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((enquiry, index)=>(
                            <Tr>
                            <Td is_read={enquiry.is_read}>{index+1}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.enquiry_date}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.name}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.email}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.phone}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.message}</Td>
                            <Td is_read={enquiry.is_read}>{enquiry?.project?.name}</Td>
                            <Td className='cursor-pointer' is_read={enquiry.is_read} onClick={() => {setModal(true),!enquiry.is_read && EnquiryReadUpdate(enquiry),setShowData(enquiry)}}><FaEye className='mx-auto w-6 h-6' /></Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>)}
            </TableSection>
            {/* <NoDataFound/> */}
            {showData &&<EnquiryModal isModal={isModal} setModal={setModal} showData={showData} />}
        </Section>
    )
}

export default Enquiry

const Section = styled.div``

const Print = styled.h3`
 button{
    padding:14px 20px;
    font-size: 13px;
    text-align: center;
    background-color: var(--lightblue);
    color: #fff;
    border:none;
    border-radius: 10px;
 }
`;

const TableSection = styled.div`
    width: 100%;
`

const Table = styled.table`
   width: 100%;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`;

const Thead = styled.thead`
`;

const Tr = styled.tr`
    display: grid;
    align-items: start;
    grid-template-columns: 4rem 8rem 1fr 1fr 1fr 20rem 1fr 5rem;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const Th = styled.th`
    background-color: #1b1d21;
    font-size:16px;
    text-transform: capitalize;
    padding:10px;
    border: 1px solid #525355;
    border-radius: 0.6rem;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    overflow-x: auto;
    text-align: center;
    font-size:16px;
    text-transform: capitalize;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:15px;
    border: 1px solid #525355;

    border-radius: 0.6rem;
    &::-webkit-scrollbar {
        display: none;
    }
    ${({ is_read }) => is_read
        ? css`;`
        : css`background-color: #444242;`
    }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;
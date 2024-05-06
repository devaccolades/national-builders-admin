import React, { useState } from 'react'
import styled, {css} from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import NoDataFound from '../components/common/NoDataFound';

// Icons
import { FaEye } from "react-icons/fa6";
import EnquiryModal from '../components/modal/EnquiryModal';

function Enquiry() {
    const [isModal, setModal] = useState(false)
    const [data, setData] = useState([])
    const downloadEnquires = () => {
        // window.location.href=printEnquiry;
    };
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Enquiries"} />
                <Print className='flex justify-end items-start'>
                    <button className='bg-[lightblue]' onClick={downloadEnquires}>Print</button>
                </Print>
            </div>
            <TableSection>
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
                        <Tr>
                            <Td is_read={false}>1</Td>
                            <Td is_read={false}>12/2/2001</Td>
                            <Td is_read={false}>sifan</Td>
                            <Td is_read={false}>daxo@gmail.com</Td>
                            <Td is_read={false}>9562040856</Td>
                            <Td is_read={false}>nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing </Td>
                            <Td is_read={false}>no product</Td>
                            <Td is_read={false} onClick={()=>setModal(true)}><FaEye className='mx-auto w-6 h-6'/></Td>
                        </Tr>
                        <Tr>
                            <Td is_read={true}>1</Td>
                            <Td is_read={true}>12/2/2001</Td>
                            <Td is_read={true}>sifan</Td>
                            <Td is_read={true}>daxo@gmail.com</Td>
                            <Td is_read={true}>9562040856</Td>
                            <Td is_read={true}>nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing nothing </Td>
                            <Td is_read={true}>no product</Td>
                            <Td is_read={true} onClick={()=>setModal(true)}><FaEye className='mx-auto w-6 h-6'/></Td>
                        </Tr>

                    </Tbody>
                </Table>
            </TableSection>
            {/* <NoDataFound/> */}
            <EnquiryModal isModal={isModal} setModal={setModal}/>
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
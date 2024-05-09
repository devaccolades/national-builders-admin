import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import { getKeyHandOversApi } from '../services/services';
import { Spinner } from '@material-tailwind/react';
import NoDataFound from '../components/common/NoDataFound';
import { FaEdit } from 'react-icons/fa';
import AddKeyHandOver from '../components/modal/keyhandover/AddKeyHandOver';

function KeyHandOver() {
    const [data,setData] = useState(null)
    const [isModal,setModal] = useState(false)

    const fetchData = async () =>{
        try {
            const res = await getKeyHandOversApi()
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
  return (
    <Section>
    <div className='grid grid-cols-2'>
        <ContentTitle text={"Key Handover"} />
        <Button className='flex justify-end items-start'>
            <button onClick={()=>setModal(true)}>Add Key Handover</button>
        </Button>
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
                                <Th>Image</Th>
                                <Th>Name</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((key, index) => (
                                <Tr className='cursor-pointer' key={index} onClick={()=>{setEditModal(true),setEditdata(rental)}}>
                                    <Td>{index + 1}</Td>
                                    <Td><img src={key?.image} alt="" /></Td>
                                    <Td>{key?.name}</Td>
                                    <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                )}
            </TableSection>
            <AddKeyHandOver isModal={isModal} setModal={setModal}/>
    </Section>
  )
}   

export default KeyHandOver

const Section = styled.div``

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
const TableSection = styled.div`
    width: 100%;
`

const Table = styled.table`
   width: 100%;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
`;

const Thead = styled.thead`
`;

const Tr = styled.tr`
    display: grid;
    align-items: start;
    grid-template-columns: 4rem 1fr 1fr 1fr;
    margin-bottom: 1rem;
    gap:4px;
`;

const Th = styled.th`
    background-color: #1b1d21;
    font-size:16px;
    text-transform: capitalize;
    padding:10px;
    border: 1px solid #525355;
`;

const Tbody = styled.tbody`
    /* margin-top: -12px; */
`;

const Td = styled.td`
/* margin-top: -12px; */
    overflow-x: auto;
    text-align: center;
    font-size:16px;
    text-transform: capitalize;

    /* padding:10px; */
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #525355;
    background-color: #3a3838;
    &::-webkit-scrollbar {
        display: none;
    }
    img{
        width: 10rem;
        margin: 0 auto;
    }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;
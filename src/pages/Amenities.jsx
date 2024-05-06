import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import { Spinner } from '@material-tailwind/react';
import NoDataFound from '../components/common/NoDataFound';
import { getAllAmenitiesApi } from '../services/services';
import { FaEdit } from 'react-icons/fa';
import AddAmenities from '../components/modal/amenities/AddAmenities';
import EditAmenities from '../components/modal/amenities/EditAmenities';

function Amenities() {
    const [data, setData] = useState(null)
    const [editData,setEditData] = useState('')
    const [isModal, setModal] = useState(false)
    const [isEditModal, setEditModal] = useState(false)
    const GetAmenitiesdata = async () => {
        try {
            const res = await getAllAmenitiesApi()
            const { StatusCode, data } = res.data;
            if (StatusCode === 6000) {
                setData(data)
            } else {
                setData([])
            }
        } catch (error) {
            setData([])
        }
    }
    useEffect(() => {
        if (!isModal && !isEditModal) {
            GetAmenitiesdata();
        }
    }, [isModal, isEditModal]);
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Amenities"} />
                <Left className='flex justify-end items-start'>
                    <button onClick={()=>setModal(true)}>Add Amenities</button>
                </Left>
            </div>
            <AmenitieshList>
                {data === null ? (
                    <Loader>
                        <Spinner className="h-6 w-6" />
                    </Loader>
                ) : data.length === 0 ? (
                    <NoDataFound />
                ) : (<Table>
                    <Thead>
                        <Tr>
                            <Th>SI.no</Th>
                            <Th>Image</Th>
                            <Th>Title</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((amenities, index) => (
                            <Tr className='cursor-pointer'>
                                <Td onClick={() => { setEditData(amenities), setEditModal(true) }}>{index + 1}</Td>
                                <Td onClick={() => { setEditData(amenities), setEditModal(true) }}><img src={amenities?.logo} alt={amenities.title} /></Td>
                                <Td onClick={() => { setEditData(amenities), setEditModal(true) }}>{amenities?.title}</Td>
                                <Td onClick={() => { setEditData(amenities), setEditModal(true) }}><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>)}
            </AmenitieshList>
            <AddAmenities isModal={isModal} setModal={setModal}/>
            {isEditModal && <EditAmenities isModal={isEditModal} setModal={setEditModal} editdData={editData}/>}
        </Section>
    )
}

export default Amenities

const Section = styled.div``

const Left = styled.h3`
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
const AmenitieshList = styled.div`
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
    grid-template-columns: 4rem 1fr 1fr  6rem;
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
    height:6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #525355;
    background-color: #3a3838;
    &::-webkit-scrollbar {
        display: none;
    }
    img{
        width: 6rem;
        padding: 8px;
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
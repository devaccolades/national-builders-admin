import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { getSeoApi } from '../services/services'
import NoDataFound from '../components/common/NoDataFound'
import { Spinner } from '@material-tailwind/react'
import { FaEdit } from 'react-icons/fa'
import AddSeo from '../components/modal/seo/AddSeo'
import EditSeo from '../components/modal/seo/EditSeo'

function Seo() {
    const [data, setData] = useState(null)
    const [isModal,setModal] = useState(false)
    const [isEditModal,setEditModal] = useState(false)
    const [editData,setEditData] = useState('')

    const fetchData = async () => {
        try {
            const res = await getSeoApi()
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
        fetchData()
    }, [])
  return (
    <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Seo Tags"} />
                <Left className='flex justify-end items-start'>
                    <button onClick={() => setModal(true)}>Add Seo</button>
                </Left>
            </div>
            <SeoList>
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
                            <Th>Path</Th>
                            <Th>Page</Th>
                            <Th>Meta Title</Th>
                            <Th>Meta Description</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((seo, index) => (
                            <Tr className='cursor-pointer'>
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}>{index + 1}</Td>
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}>{seo?.path}</Td>
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}>{seo?.page}</Td>
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}>{seo?.meta_title}</Td>
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}>{seo?.meta_description}</Td>
        
                                <Td onClick={() => { setEditData(seo), setEditModal(true) }}><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
            </SeoList>
            <AddSeo isModal={isModal} setModal={setModal} fetchData={fetchData} />
            {isEditModal && <EditSeo isModal={isEditModal} setModal={setEditModal} editData={editData} fetchData={fetchData} />}
        </Section>
  )
}

export default Seo

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

const SeoList = styled.div`
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
    grid-template-columns: 4rem 10rem 16rem 1fr 1fr 6rem;
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
        /* width: 6rem; */
        padding: 4px;
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
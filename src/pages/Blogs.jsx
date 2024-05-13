import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import { Spinner } from '@material-tailwind/react';
import NoDataFound from '../components/common/NoDataFound';
import { getBlogsApi } from '../services/services';
import { FaEdit } from 'react-icons/fa';
import AddBlogs from '../components/modal/blogs/AddBlogs';
import EditBlogs from '../components/modal/blogs/EditBlogs';
import { useNavigate } from 'react-router-dom';

function Blogs() {
    const [data, setData] = useState(null)
    const [isModal,setModal] = useState(false)
    const [isEditModal,setEditModal] = useState(false)
    const [editData,setEditData] = useState('')

    const fetchData = async () => {
        try {
            const res = await getBlogsApi()
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
                <ContentTitle text={"Blogs"} />
                <Button className='flex justify-end items-start'>
                    <button onClick={() => setModal(true)}>Add Blogs</button>
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
                                <Th>Title</Th>
                                <Th>Body</Th>
                                <Th>Slug</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((blog, index) => (
                                <Tr className='cursor-pointer' key={index}  onClick={()=>{setEditData(blog) ,setEditModal(true)}}>
                                    <Td>{index + 1}</Td>
                                    <Td><img src={blog?.image} alt={blog?.image_alt} /></Td>
                                    <Td>{blog?.title}</Td>
                                    <Td body={blog?.body ? true : false} className='p-3'>
                                        <Content dangerouslySetInnerHTML={{ __html: blog?.body }} />
                                    </Td>
                                    <Td>{blog?.slug}</Td>
                                    <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                )}
            </TableSection>
           {!isEditModal && <AddBlogs isModal={isModal} setModal={setModal} fetchData={fetchData}/>}
            {editData && isEditModal && <EditBlogs isModal={isEditModal} setModal={setEditModal} fetchData={fetchData} editData={editData}/>}
        </Section>
    )
}

export default Blogs

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
    grid-template-columns: 4rem 10rem 20rem 1fr 16rem 6rem;
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
    align-items: ${props => props.body ? 'start' : 'center'};
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

const Content =styled.div`
text-align: start;
    strong{
        font-family: mont-bold;
    }
    H1,H2,H3,H4,H5,H6{
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
        font-family: mont-bold;
    }
`

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;

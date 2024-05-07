import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getAllProjectsApi } from '../services/services';
import { Spinner } from '@material-tailwind/react';
import NoDataFound from '../components/common/NoDataFound';

function Project() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    useEffect(() => {
        const GetAllProjects = async () => {
            try {
                const res = await getAllProjectsApi()
                const { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    setData(data)
                } else {
                    setData([])
                }
            } catch (error) {
                console.log(error);
                setData([])
            }
        }
        GetAllProjects()
    }, [])
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Projects"} />
                <Button className='flex justify-end items-start'>
                    <button onClick={() => navigate('/add-project')}>Add Project</button>
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
                            <Th>Thumbnail</Th>
                            <Th>Name</Th>
                            <Th>Location</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((project,index)=>(
                            <Tr onClick={()=>navigate(`/edit-project/${project.slug}`)} className='cursor-pointer' key={index}>
                            <Td>{index+1}</Td>
                            <Td><img src={project.thumbnail} alt="" /></Td>
                            <Td>{project.name}</Td>
                            <Td>{project.location}</Td>
                            <Td>{project.status}</Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                        </Tr>
                        ))}

                    </Tbody>
                </Table>
                )}
            </TableSection>
        </Section>
    )
}

export default Project

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
    grid-template-columns: 4rem 1fr 1fr 20rem 10rem 6rem;
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
    padding:10px;
    height: 9.5rem;
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
import React from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Project() {
    const navigate = useNavigate()
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Projects"} />
                <Button className='flex justify-end items-start'>
                    <button onClick={()=>navigate('/add-project')}>Add Project</button>
                </Button>
            </div>
            <TableSection>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>SI.no</Th>
                            <Th>Name</Th>
                            <Th>Location</Th>
                            <Th>Thumbnail</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>Natina Builders</Td>
                            <Td>Thiruvalla</Td>
                            <Td><img src="https://nationalbuilders.in/wp-content/uploads/2021/05/shalom.jpg" alt="" /></Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer'/></Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>Natina Builders</Td>
                            <Td>Thiruvalla</Td>
                            <Td><img src="https://nationalbuilders.in/wp-content/uploads/2021/05/shalom.jpg" alt="" /></Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer'/></Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>Natina Builders</Td>
                            <Td>Thiruvalla</Td>
                            <Td><img src="https://nationalbuilders.in/wp-content/uploads/2021/05/shalom.jpg" alt="" /></Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer'/></Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>Natina Builders</Td>
                            <Td>Thiruvalla</Td>
                            <Td><img src="https://nationalbuilders.in/wp-content/uploads/2021/05/shalom.jpg" alt="" /></Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer'/></Td>
                        </Tr> <Tr>
                            <Td>1</Td>
                            <Td>Natina Builders</Td>
                            <Td>Thiruvalla</Td>
                            <Td><img src="https://nationalbuilders.in/wp-content/uploads/2021/05/shalom.jpg" alt="" /></Td>
                            <Td><FaEdit className='mx-auto w-6 h-6 cursor-pointer'/></Td>
                        </Tr>
                    </Tbody>
                </Table>
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
    grid-template-columns: 4rem 1fr 1fr 20rem 6rem;
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

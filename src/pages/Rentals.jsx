import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { EditRentaleApi, getRentalsApi } from '../services/services'
import { Spinner } from '@material-tailwind/react'
import NoDataFound from '../components/common/NoDataFound'
import { FaEdit } from 'react-icons/fa'
import AddRentals from '../components/modal/rentals/AddRentals'
import EditRentals from '../components/modal/rentals/EditRentals'
import Swal from 'sweetalert2'

function Rentals() {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [isModal,setModal] = useState(false)
    const [isEditModal,setEditModal] = useState(false)
    const [editdata,setEditdata] = useState('')

    const fetchData = async () => {
        try {
            const res = await getRentalsApi()
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

      // Change Visiblity of the frontend Rentals page
      const ChangeRentalSelection = async (values) => {
        Swal.fire({
            title: '',
            text: `${!values.is_hide ? `Do you want to hide the '${values.name}' from the user side?`:`Do you want to display the '${values.name}' branch on the user side?`}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!',
        
        }).then(async (result) => {
            if (result.isConfirmed) {
                  try {
                    setLoading(true)
                    const res = await EditRentaleApi({ "is_hide": !values.is_hide }, values.id);
                    const { StatusCode , message} = res.data;
                    if (StatusCode === 6000) {
                        fetchData()
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Updated !`,
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                      });
                    } if (StatusCode === 6002) {
                      Swal.fire({
                        position: 'top-end',
                        icon: 'error', 
                        title: `${message || "Some thing wrong"} !`,
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                      });
                    }
                  } catch (error) {
                    console.log(error);
                    alert('Something wrong');
                  } finally{
                    setLoading(false)
                  }
            }
        });
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Rentals"} />
                <Button className='flex justify-end items-start'>
                    <button onClick={()=>setModal(true)}>Add Rentals</button>
                </Button>
            </div>
            <TableSection>
                {data === null || isLoading? (
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
                                <Th>Location</Th>
                                <Th>type</Th>
                                <Th>area</Th>
                                <Th>price</Th>
                                <Th>is hide</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((rental, index) => (
                                <Tr className='cursor-pointer' key={index} >
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{index + 1}</Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}><img src={rental?.image} alt="" /></Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{rental?.name}</Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{rental?.company_branch.location}</Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{rental?.type}</Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{rental?.area}</Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}>{rental?.price}</Td>
                                    <Td onClick={()=>ChangeRentalSelection(rental)}>
                                        {rental?.is_hide ?
                                            (<button className='bg-[#519bf4] text-white h-full w-full'>Show</button>) :
                                            (<button className='bg-gray-900 h-full w-full'>Hide</button>)}
                                    </Td>
                                    <Td onClick={()=>{setEditModal(true),setEditdata(rental)}} is_hide={rental.is_hide}><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                )}

            </TableSection>
            <AddRentals isModal={isModal} setModal={setModal} fetchData={fetchData}/>
           {editdata &&isEditModal && <EditRentals isModal={isEditModal} setModal={setEditModal} fetchData={fetchData} editdata={editdata}/>}
        </Section>
    )
}

export default Rentals

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
    grid-template-columns: 4rem 10rem 20rem 10rem 1fr 1fr 1fr 1fr 6rem;
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
    opacity: ${props => props.is_hide ? '50%' : '100%'};

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
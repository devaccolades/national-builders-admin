import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import AddBranch from '../components/modal/branch/AddBranch';
import EditBranch from '../components/modal/branch/EditBranch';
import NoDataFound from '../components/common/NoDataFound';
import { ChangeBrangeSelectionApi, getBranchApi } from '../services/services';
import { Spinner } from '@material-tailwind/react';
import Swal from 'sweetalert2';
// Icons
import { FaEdit } from 'react-icons/fa'

function Contact() {
    const [data, setData] = useState(null)
    const [editdData, setEditData] = useState("")
    const [isModal, setModal] = useState(false)
    const [isEditModal, setEditModal] = useState(false)

    const GetBranchData = async () => {
        try {
            const res = await getBranchApi()
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


    // Change Visiblity of the frontend BranchView
    const ChangeBrangeSelection = async (values) => {
        Swal.fire({
            title: '',
            text: `${values.show_user_side ? `Do you want to hide the '${values.location}' branch on the user side?`:`Do you want to display the '${values.location}' branch on the user side?`}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!',
        
        }).then(async (result) => {
            if (result.isConfirmed) {
                  try {
                    const res = await ChangeBrangeSelectionApi({ show_user_side: !values.show_user_side }, values.id);
                    const { StatusCode , message} = res.data;
                    if (StatusCode === 6000) {
                        GetBranchData()
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
                  }
            }
        });
    }
    useEffect(() => {
        if (!isModal && !isEditModal) {
            GetBranchData();
        }
    }, [isModal, isEditModal]);
    
    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Contact & Branch"} />
                <Left className='flex justify-end items-start'>
                    <button onClick={() => setModal(true)}>Add Branch</button>
                </Left>
            </div>
            <BranchList>
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
                            <Th>Location</Th>
                            <Th>Address</Th>
                            <Th>Phone Numbers</Th>
                            <Th>Iframe</Th>
                            <Th>View</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((branch, index) => (
                            <Tr className='cursor-pointer'>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}>{index + 1}</Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}><img src={branch?.image} alt="" /></Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}>{branch?.location}</Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}>{branch?.address}</Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}>{branch?.phone_number}</Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}>{branch?.iframe}</Td>
                                <Td>
                                    {branch.show_user_side === true ? (
                                        <button onClick={() => { ChangeBrangeSelection(branch) }} className='bg-[--lightblue] h-full w-full text-white'>Hide</button>
                                    ) : (
                                        <button onClick={() => { ChangeBrangeSelection(branch) }} className='bg-[--darkgrey] h-full w-full text-white'>Show</button>
                                    )}
                                </Td>
                                <Td onClick={() => { setEditData(branch), setEditModal(true) }}><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>)}
            </BranchList>
            <AddBranch isModal={isModal} setModal={setModal} />
            {isEditModal && <EditBranch isModal={isEditModal} setModal={setEditModal} editdData={editdData} />}
        </Section>
    )
}

export default Contact

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

const BranchList = styled.div`
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
    grid-template-columns: 4rem 8rem 1fr 1fr 1fr 1fr 6rem 6rem;
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
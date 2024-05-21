import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../../common/ContentTitle'
import { DeleteDistanceApi, DeleteProjectspecificationApi, getProjectDistanceApi, getProjectSpecificationsApi } from '../../../services/services'
import { Spinner } from '@material-tailwind/react'
import AddProjectSpecifications from '../../modal/projectspecifications/AddProjectSpecifications'
import EditProjectSpecifications from '../../modal/projectspecifications/EditProjectSpecifications'
import Swal from 'sweetalert2'
import AddNearBy from '../../modal/Nearby/AddNearBy'
import EditNearBy from '../../modal/Nearby/EditNearBy'

function SpecificationAndNearBy({ projectId }) {
  const [isLoading, setLoading] = useState(false)
  const [specifications, setSpecifications] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isModal, setModal] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [editData, setEditData] = useState('')
// Near By
  const [isNearByModal, setNearByModal] = useState(false)
  const [isNearByEdit, setNearByEdit] = useState(false)
  const [nearByEditData, setNearByEditData] = useState('')

  const fetchData = async () => {
    try {
      const res = await getProjectSpecificationsApi(projectId);
      const { StatusCode, data } = res.data;
      if (StatusCode === 6000) {
        setSpecifications(data)
      } else {
        setSpecifications([])
      }
    } catch (error) {
      setSpecifications([])
    }
  }

  const fetchDistanceData = async () => {
    try {
      const res = await getProjectDistanceApi(projectId);
      const { StatusCode, data } = res.data;
      if (StatusCode === 6000) {
        setDistance(data)
      } else {
        setDistance([])
      }
    } catch (error) {
      setDistance([])
    }
  }

  useEffect(() => {
    fetchData();
    fetchDistanceData();
  }, [])

  // Delete Specification
  const DeleteSpecification = async (data) => {
    Swal.fire({
      title: '',
      text: `Are you sure you want to delete "${data?.title}" Specification?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await DeleteProjectspecificationApi(data?.id)
          const { StatusCode, message } = res.data;
          if (StatusCode === 6000) {
            fetchData()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `"${data.title}" Specification deleted`,
              showConfirmButton: false,
              timer: 1500,
              width:600,
            })
          } else {
            Swal.fire(message || 'Error!', 'Failed to delete Specification.');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally{
          setLoading(false)
        }

      }
    });
  }

  // Delete Near By
  const DeleteNearBy = async (data) => {
    Swal.fire({
      title: '',
      text: `Are you sure you want to delete "${data?.location_name}" near by?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await DeleteDistanceApi(data?.id)
          const { StatusCode, message } = res.data;
          if (StatusCode === 6000) {
            fetchDistanceData()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `"${data.location_name}" Near by deleted`,
              showConfirmButton: false,
              timer: 1500,
              width:600,
            })
          } else {
            Swal.fire(message || 'Error!', 'Failed to delete Specification.');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally{
          setLoading(false)
        }

      }
    });
  }
  return (
    <Section>
      <SpecificationsList>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Specifications"} />
          <Button className='flex justify-end items-start'>
            <button onClick={() => setModal(true)}>Add Specifications</button>
          </Button>
        </div>
        {specifications === null || isLoading? (
          <Loader>
            <Spinner className="h-6 w-6" />
          </Loader>
        ) : specifications.length === 0 ? (
          <>
            <p className='text-center'>Please Add At Least One Specifications</p>
          </>
        ) : (
          <div className='grid grid-cols-2 gap-5 w-[90%] mx-auto'>
            {specifications.map((specific, indes) => (
              <div className='flex flex-col gap-1 border border-gray-800 rounded-[1.1rem] p-5 hover:text-white cursor-pointer'>
                <div className='flex flex-row justify-between'>
                  <p className='title'>{specific?.title}</p>
                  <div className='flex flex-row gap-8 items-center pe-10'>

                    <button onClick={() => DeleteSpecification(specific)}> <svg className='w-5 h-10 ' viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" ><path fill="#737373" d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg></button>
                    <button onClick={() => { setEditData(specific), setEdit(true) }}>
                      <svg className="w-5 h-5 feather feather-edit" fill="none" height="24" stroke="#737373" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                  </div>
                </div>
                <p>{specific?.description}</p>
              </div>
            ))}
          </div>
        )}
      </SpecificationsList>
      <NearByList>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Near By"} />
          <Button className='flex justify-end items-start'>
            <button onClick={()=>setNearByModal(true)}>Add Near by</button>
          </Button>
        </div>
        {distance === null ? (
          <Loader>
            <Spinner className="h-6 w-6" />
          </Loader>
        ) : distance.length === 0 ? (
          <>
            <p className='text-center'>Please Add At Least One Distance</p>
          </>
        ) : (
          <div className='grid grid-cols-2 gap-5 w-[90%] mx-auto'>
            {distance.map((distance, indes) => (
              <div className='flex flex-row justify-between gap-1 hover:text-white cursor-pointer border p-5 border-gray-800 rounded-[1.1rem]'>
                  <div className='flex flex-col gap-3'>
                  <p className='title'>{distance?.location_name}</p>
                  <p>{distance?.distance} {distance?.measurement_unit}</p>
                  </div>
                  <div className='flex flex-row gap-8 items-center pe-10'>
                    <button onClick={() => DeleteNearBy(distance)}> <svg className='w-5 h-10 ' viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" ><path fill="#737373" d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg></button>
                    <button onClick={() => { setNearByEditData(distance), setNearByEdit(true) }}>
                      <svg className="w-5 h-5 feather feather-edit" fill="none" height="24" stroke="#737373" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </NearByList>
     {projectId&& <AddProjectSpecifications isModal={isModal} setModal={setModal} fetchData={fetchData} projectId={projectId} />}
      {isEdit && <EditProjectSpecifications isModal={isEdit} setModal={setEdit} fetchData={fetchData} editData={editData} />}
      {projectId && <AddNearBy isModal={isNearByModal} setModal={setNearByModal} fetchData={fetchDistanceData} projectId={projectId} />}
     {isNearByEdit &&  <EditNearBy isModal={isNearByEdit} setModal={setNearByEdit} editData={nearByEditData} fetchData={fetchDistanceData} />}
    </Section>
  )
}

export default SpecificationAndNearBy

const Section = styled.div`
`
const SpecificationsList = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 0 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-bottom: 5rem;
.title{
  font-family: mont-bold;
  font-size: 20px;
  text-transform: capitalize;
}
`

const NearByList = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 0 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-bottom: 5rem;
`
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

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;
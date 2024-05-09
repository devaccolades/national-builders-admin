import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../../common/ContentTitle'
import AddAmenities from '../../modal/amenities/AddAmenities'
import { UpdateAmenitiesApi, getAllAmenitiesApi, getProjectAmenitiesApi } from '../../../services/services'
import { Spinner } from '@material-tailwind/react'
import NoDataFound from '../../common/NoDataFound'
import Swal from 'sweetalert2'

function AmenitiesList({ projectId }) {
  const [isModal, setModal] = useState(false)
  const [selectAmenities, setSelectAmenities] = useState(null)
  const [amenitiesList, setAmenitiesList] = useState(null)
  // const [projectamenitiesList, setProjectamenitiesList] = useState(null)
  const FetchProjectAmenities = async () => {
    try {
      const res = await getProjectAmenitiesApi(projectId);
      const { StatusCode, message, data } = res.data;
      if (StatusCode === 6000) {
        setSelectAmenities(data);
      } else {
        setSelectAmenities([])
      }
    } catch (error) {
      console.log(error);
      setSelectAmenities([])
    }
  }
  const FetchAllAmenities = async () => {
    try {
      const res = await getAllAmenitiesApi()
      const { StatusCode, message, data } = res.data;
      if (StatusCode === 6000) {
        setAmenitiesList(data)
      } else {
        setAmenitiesList([])
      }
    } catch (error) {
      console.log(error);
      setAmenitiesList([])
    }
  }
  useEffect(() => {
    if(!isModal){
      FetchProjectAmenities();
    FetchAllAmenities();
    }
  }, [isModal])

  const handleAmenityClick = (amenity) => {
    const index = selectAmenities.indexOf(amenity);

    if (index !== -1) {
      const updatedAmenities = [...selectAmenities];
      updatedAmenities.splice(index, 1);
      setSelectAmenities(updatedAmenities);
    } else {
      setSelectAmenities(prevState => [...prevState, amenity]);
    }
  };
  const UpdateAmenities = async () => {
    if (selectAmenities.length === 0) {
      Swal.fire('Please Select At Least One Amenity.');
    } else {
      try {
        const res = await UpdateAmenitiesApi(selectAmenities, projectId)
        const { StatusCode, message, data } = res.data;
        if (StatusCode === 6000) {
          setSelectAmenities(data)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Amenities Updated !",
            showConfirmButton: false,
            timer: 1500,
            width: 600,
          })
        }
      } catch (error) {

      }
    }
  }
  return (
    <Section>
      <AmenitiesLising>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Amenities"} />
          <Button className='flex justify-end items-start'>
            <button onClick={() => setModal(true)}>Add Amenities</button>
          </Button>
        </div>
        {amenitiesList === null || selectAmenities === null ? (
          <Loader>
            <Spinner className="h-6 w-6" />
          </Loader>
        ) : amenitiesList.length === 0 ? (
          <>
            <p className='text-center'>Please Add At Least One Amenity</p>
          </>
        ) : (
          <div className='w-[90%] mx-auto grid grid-cols-4 gap-5'>
            {amenitiesList.map((amenity, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 justify-center items-center border border-gray-800 p-5 rounded-[1.1rem] cursor-pointer ${selectAmenities.some(selectedAmenity => selectedAmenity === amenity.id) && 'bg-gray-800'
                  }`}
                onClick={() => handleAmenityClick(amenity.id)}
              >
                <img src={amenity?.logo} alt={amenity?.title} />
                <p>{amenity?.title}</p>
              </div>
            ))}
          </div>
        )}
        <div className='flex justify-end items-center w-[90%] mx-auto'>
          <button className='update p-4 mt-5' onClick={UpdateAmenities}>Update</button>
        </div>
      </AmenitiesLising>

      <AddAmenities isModal={isModal} setModal={setModal} />
    </Section>
  )
}

export default AmenitiesList

const Section = styled.div`
`
const AmenitiesLising = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 0 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-bottom: 5rem;
.update{
   padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: black;
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
}
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
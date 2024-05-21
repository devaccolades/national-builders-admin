import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../common/ContentTitle'
import { AddAwardsImageApi, DeleteAwardsImageApi, EditAwardsImageApi, getAwardsImagesApi } from '../../services/services'
import { Spinner } from '@material-tailwind/react'
import NoDataFound from '../common/NoDataFound'
import Swal from 'sweetalert2'
import AddAwards from '../modal/awards/AddAwards'
import EditAwards from '../modal/awards/EditAwards'

function Awards() {
    const [data,setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isModal,setModal] = useState(false)
    const [isEditModal,setEditModal] = useState(false)
    const [editData,setEditData] = useState()
    // fech data from backend
  const fetData = async () => {
    try {
      const res = await getAwardsImagesApi();
      const { StatusCode, data } = res.data;
      if (StatusCode === 6000) {
        setData(data)
      } else {
        setData([])
      }
    } catch (error) {
      alert('Something went wrong')
      setData([])
    }
  }
  useEffect(()=>{
    fetData()
  },[])

//   Edit Awards Images
  const handleEditImageSelect = async (e, id) => {
    const formData = new FormData();
    formData.append('images', e.currentTarget.files[0]);
    try {
      setLoading(true)
      const res = await EditAwardsImageApi(formData, id)
      const { StatusCode,data } = res.data;
      if (StatusCode === 6000) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Image Updated!',
          showConfirmButton: false,
          timer: 1500,
          width:600,
        })
        fetData()
      } else {
        alert(data && data?.images ? 'You cannot upload SVG images':"something went wrong")
      }
    } catch (error) {
      console.error('Error:', error);
    } finally{
      setLoading(false)
    }
  }

  // Awards Image Delete
  const AwardsImageDelete = async (id) => {
    Swal.fire({
      title: '',
      text: 'Are you sure you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await DeleteAwardsImageApi(id)
          const { StatusCode, message } = res.data;
          if (StatusCode === 6000) {
            fetData()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Image Deleted !',
              showConfirmButton: false,
              timer: 1500,
              width:600,
            })
          } else {
            Swal.fire('Error!', 'Failed to delete image.', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally{
          setLoading(false)
        }

      }
    });
  };

  return (
    <Section>
        <ImageLising>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Awards Images"} />
          <Button className='flex justify-end items-start '>
          <button className='cursor-pointer' onClick={()=>setModal(true)}> Add Awards</button>
          </Button>
        </div>
        {data === null || isLoading ? (
          <Loader>
            <Spinner className="h-6 w-6" />
          </Loader>
        ) : (
          data.length === 0 ? (
            <NoDataFound />
          ) : (
            <div className='grid grid-cols-5 w-[96%] mx-auto gap-5'>
              {data.map((img, index) => (
                <div key={index} className="flex flex-col justify-center items-center relative">
                  <img
                    src={img.images}
                    className='cursor-pointer'
                    alt="project-images"
                  />
                  <div className="absolute top-4 left-0 w-full h-full flex flex-row justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg onClick={() => AwardsImageDelete(img.id)} className='cursor-pointer h-14 w-14 text-red-600 bg-white rounded-full p-2' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="1" id="_1"><path d="M356.65,450H171.47a41,41,0,0,1-40.9-40.9V120.66a15,15,0,0,1,15-15h237a15,15,0,0,1,15,15V409.1A41,41,0,0,1,356.65,450ZM160.57,135.66V409.1a10.91,10.91,0,0,0,10.9,10.9H356.65a10.91,10.91,0,0,0,10.91-10.9V135.66Z" /><path d="M327.06,135.66h-126a15,15,0,0,1-15-15V93.4A44.79,44.79,0,0,1,230.8,48.67h66.52A44.79,44.79,0,0,1,342.06,93.4v27.26A15,15,0,0,1,327.06,135.66Zm-111-30h96V93.4a14.75,14.75,0,0,0-14.74-14.73H230.8A14.75,14.75,0,0,0,216.07,93.4Z" /><path d="M264.06,392.58a15,15,0,0,1-15-15V178.09a15,15,0,1,1,30,0V377.58A15,15,0,0,1,264.06,392.58Z" /><path d="M209.9,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,209.9,392.58Z" /><path d="M318.23,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,318.23,392.58Z" /><path d="M405.81,135.66H122.32a15,15,0,0,1,0-30H405.81a15,15,0,0,1,0,30Z" /></g></svg>
                      <svg onClick={()=>{setEditModal(true),setEditData(img)}} className='cursor-pointer h-14 w-14 text-red-600 bg-white rounded-full p-2' fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.9984 6.24971C20.9984 4.45495 19.5435 3 17.7487 3H6.24971C4.45495 3 3 4.45495 3 6.24971V17.7487C3 19.5435 4.45495 20.9984 6.24971 20.9984H11.1644L11.5202 19.5754C11.5266 19.5497 11.5333 19.5241 11.5402 19.4985H6.24971C6.04586 19.4985 5.85015 19.4637 5.66822 19.3996L11.4745 13.7138L11.558 13.6431C11.8493 13.4307 12.2588 13.4543 12.5238 13.7139L14.6028 15.7501L15.6636 14.6893L13.5732 12.6423L13.4448 12.5257C12.5666 11.7877 11.2581 11.8265 10.4251 12.6421L4.60312 18.3423C4.53629 18.157 4.49987 17.9571 4.49987 17.7487V6.24971C4.49987 5.2833 5.2833 4.49987 6.24971 4.49987H17.7487C18.7151 4.49987 19.4985 5.2833 19.4985 6.24971V11.2317C19.9774 11.0412 20.492 10.9678 20.9984 11.0115V6.24971ZM17.503 8.75161C17.503 7.50791 16.4947 6.49969 15.251 6.49969C14.0073 6.49969 12.9991 7.50791 12.9991 8.75161C12.9991 9.99531 14.0073 11.0035 15.251 11.0035C16.4947 11.0035 17.503 9.99531 17.503 8.75161ZM14.499 8.75161C14.499 8.33626 14.8357 7.99956 15.251 7.99956C15.6664 7.99956 16.0031 8.33626 16.0031 8.75161C16.0031 9.16695 15.6664 9.50366 15.251 9.50366C14.8357 9.50366 14.499 9.16695 14.499 8.75161ZM19.0984 12.6686L13.1965 18.5705C12.8524 18.9146 12.6083 19.3458 12.4903 19.8179L12.0327 21.6484C11.8336 22.4445 12.5547 23.1656 13.3508 22.9666L15.1813 22.5089C15.6534 22.3909 16.0846 22.1468 16.4287 21.8027L22.3306 15.9008C23.2231 15.0082 23.2231 13.5611 22.3306 12.6686C21.4381 11.7761 19.991 11.7761 19.0984 12.6686Z" fill="black" /></svg>
                   
                  </div>
                  <p className='mt-3'>{img.image_alt}</p>
                </div>
              ))}
            </div>
          ))}
        </ImageLising>
        <AddAwards isModal={isModal} setModal={setModal} fetData={fetData}/>
       {editData&& isEditModal && <EditAwards isModal={isEditModal} setModal={setEditModal} fetData={fetData} editData={editData}/>}
    </Section>
  )
}

export default Awards

const Section = styled.div``

const ImageLising = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 20px 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-top: 3rem;
margin-bottom: 3rem;
`

const Button = styled.div`
 label , button{
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
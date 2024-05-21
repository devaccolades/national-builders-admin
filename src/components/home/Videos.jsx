import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../common/ContentTitle'
import { getHomePageVideosApi } from '../../services/services'
import { Spinner } from '@material-tailwind/react'
import NoDataFound from '../common/NoDataFound'
import AddHomePageVideos from '../modal/home/AddHomePageVideos'
import EditHomePageVideos from '../modal/home/EditHomePageVideos'

function Videos() {
  const [isModal, setModal] = useState(false)
  const [isEditModal, setEditModal] = useState(false)
  const [data, setData] = useState(null)

  // fech data from backend
  const fetchData = async () => {
    try {
      const res = await getHomePageVideosApi();
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
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const videoElement = document.getElementById("desktop-video");
    const mobilevideoElement = document.getElementById("mobile-video");
    if (videoElement) {
      videoElement.load();
      videoElement.play();
    }
    if (mobilevideoElement) {
      mobilevideoElement.load();
      mobilevideoElement.play();
    }
  }, [data]);

  return (
    <Section>
      <ImageLising>
        <div className='w-[95%] mx-auto grid grid-cols-2'>
          <ContentTitle text={"Home Page Videos"} />
          <Button className='flex justify-end items-start'>
            {data?.length === 0 ? (<button onClick={() => setModal(true)}>Add Videos</button>) :
              (<button onClick={()=>setEditModal(true)}>Edit Videos</button>)}

          </Button>
        </div>
        <div>
          {data === null ? (
            <Loader>
              <Spinner className="h-6 w-6" />
            </Loader>
          ) : (
            data.length === 0 ? (
              <NoDataFound />
            ) : (
              <>
                <div className='px-20 mx-auto py-10 bg-gray-900'>
                  <ContentTitle text={"Desktop Video"} />
                  <div className='flex flex-col justify-center items-center'>
                    <video
                      id="desktop-video"
                      autoplay
                      loop
                      playsinline
                      controls
                      muted
                    >
                      <source src={data[0]?.desktop_video} type="video/mp4" autoCorrect='' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className='px-20 mx-auto pb-10 bg-gray-900'>
                  <ContentTitle text={"mobile Video"} />
                  <div className='flex flex-col justify-center items-center'>
                    <video
                      id="mobile-video"
                      autoplay
                      loop
                      playsinline
                      controls
                      muted
                    >
                      <source src={data[0]?.mobile_video} type="video/mp4" autoCorrect='' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

              </>
            ))}
        </div>
      </ImageLising>
      <AddHomePageVideos isModal={isModal} setModal={setModal} fetchData={fetchData} />
      <EditHomePageVideos isModal={isEditModal} setModal={setEditModal} fetchData={fetchData} data={data}/>
    </Section>
  )
}

export default Videos

const Section = styled.div``

const ImageLising = styled.div`
border: 1px solid var(--bordercolor);
border-radius: 20px 20px 20px 20px;
padding-top: 1rem;
padding-bottom: 2rem;
margin-top: 3rem;
margin-bottom: 3rem;
`

const Button = styled.h3`
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
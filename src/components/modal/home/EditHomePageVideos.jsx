import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { HomePageVideoEditsSchema } from '../../../Validations/Validations';
import { EditHomePageVideoApi } from '../../../services/services';
import Swal from 'sweetalert2';
import ButtonLoading from '../../common/ButtonLoading';
function EditHomePageVideos({ isModal, setModal, fetchData, data }) {
    const [isLoading, setLoading] = useState(false)
    const [desktop_video, setdesktop_video] = useState('')
    const [mobile_video, setmobile_video] = useState('')
    const initialValues = {
        desktop_video: "",
        mobile_video: "",

    }
    const {
        values,
        errors,
        touched,
        resetForm,
        handleBlur,
        handleSubmit,
        handleChange,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: HomePageVideoEditsSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            if (values.desktop_video){
                formData.append('desktop_video', desktop_video);
            }
            if (values.mobile_video){
                formData.append('mobile_video', mobile_video);
            }
            try {
                setLoading(true)
                const res = await EditHomePageVideoApi(formData,data[0]?.id)
                const { StatusCode } = res.data;
                if (StatusCode === 6000) {
                    setModal(false)
                    fetchData()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Video Updated !',
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                    })
                    resetForm();
                } else if (StatusCode === 6002) {
                    alert('Somthing went wrong')
                }
            } catch (error) {
                console.log(error);
                alert('Somthing went wrong')
            } finally {
                setLoading(false)
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const videoElement = document.getElementById("desktop-video-edit");
        const mobileVideoElement = document.getElementById("mobile-video-edit");
        if (videoElement && mobileVideoElement) {
            videoElement.load();
            videoElement.play();
            mobileVideoElement.load();
            mobileVideoElement.play();
        }
    }, [data, desktop_video, mobile_video]);
    
    return (
        <Container className={isModal && "active"}>
            <Overlay onClick={() => setModal(false)}></Overlay>
            <Modal>
                <div>
                    <Heding>Edit Videos</Heding>
                    <Form onSubmit={handleSubmit}>
                        <Cover>
                            <Label>DeskTop Video</Label>
                            <div className='w-full'>
                                {data && (
                                    <div className='flex flex-col justify-center items-center'>
                                        <video
                                            id="desktop-video-edit"
                                            autoplay
                                            loop
                                            playsinline
                                            controls
                                            muted
                                        >
                                            <source src={values.desktop_video? URL.createObjectURL(desktop_video) : data[0]?.desktop_video} type="video/mp4" autoCorrect='' />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    name={"desktop_video"}
                                    onChange={(event) => {
                                        handleChange(event);
                                        setdesktop_video(event.currentTarget.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.desktop_video}
                                    accept=".mp4, .avi, .mov, .mkv, .wmv, .webm"
                                />
                                {touched.desktop_video && errors.desktop_video && (
                                    <div className="text-red-500 text-sm pt-1 -mb-3">{errors.desktop_video}</div>
                                )}
                            </div>
                        </Cover>
                        <Cover>
                            <Label>Mobile Video</Label>
                            <div className='w-full'>
                                {data && (
                                    <div className='flex flex-col justify-center items-center'>
                                        <video
                                            id="mobile-video-edit"
                                            autoplay
                                            loop
                                            playsinline
                                            controls
                                            muted
                                        >
                                            <source src={values.mobile_video? URL.createObjectURL(mobile_video) :data[0]?.mobile_video} type="video/mp4" autoCorrect='' />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    name={"mobile_video"}
                                    onChange={(event) => {
                                        handleChange(event);
                                        setmobile_video(event.currentTarget.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.mobile_video}
                                    accept=".mp4, .avi, .mov, .mkv, .wmv, .webm"
                                />
                                {touched.mobile_video && errors.mobile_video && (
                                    <div className="text-red-500 text-sm pt-1 -mb-3">{errors.mobile_video}</div>
                                )}
                            </div>
                        </Cover>
                       {isLoading?(<ButtonLoading/>):( <SubmitBtn>
                            <button type='submit'>
                                Update
                            </button>
                        </SubmitBtn>)}
                    </Form>
                </div>
            </Modal>
        </Container>
    )
}

export default EditHomePageVideos

const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  &.active {
    transform: scale(1, 1);
    backdrop-filter: blur(4px);
  }
`;
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0px;
  width: 100%;
  z-index: 1000;
  min-height: 100vh;
  max-height: 100vh;
  filter: blur(1px);
`;
const Modal = styled.div`
  width: 90%;
  max-width: 736px;
  max-height: 100vh;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s;
  z-index: 1000;
  background: #232327;
  border-radius: 5px;
  overflow-y: hidden;
  box-shadow: 0px 3px 56px #000;
  overflow-y: scroll;
  background-color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    padding: 4rem;
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 1380px) {
    left: 58%;
  }
  @media all and (max-width: 1280px) {
    width: 550px;
  }
  @media all and (max-width: 1080px) {
    width: 500px;
  }
  @media all and (max-width: 980px) {
    width: 450px;
  }
  @media all and (max-width: 768px) {
    width: 400px;
  }
  @media all and (max-width: 640px) {
    width: 350px;
  }
  @media all and (max-width: 480px) {
    width: 330px;
  }
  @media all and (max-width: 360px) {
    width: 300px;
  }
`;

const Heding = styled.h3`
    font-size: 25px;
    text-align: center;
    margin-bottom: 1.5rem;
`
const Form = styled.form`
    width: 100%;
    margin: 0 auto;
`
const Cover = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;


const Label = styled.div`
  color: var(--textcolor);
  width: 40%;
`;
const Input = styled.input`
  padding: 10px 20px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #5b5b5b;
  border: none;
  outline: none;
  color: #fff;
`;
const TextArea = styled.textarea`
  padding: 10px 20px;
  width: 100%;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #5b5b5b;
  border: none;
  outline: none;
  color: #fff;
`;
const SubmitBtn = styled.div`
  display: flex;
  justify-content: end;
  button{
  padding:6px 30px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: black;
    border-radius: 10px;
 }
`
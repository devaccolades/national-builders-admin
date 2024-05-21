import { useFormik } from 'formik';
import React, { useState } from 'react'
import styled from 'styled-components';
import { FloorImageEditSchema } from '../../../Validations/Validations';
import { EditFloorPlanImagesApi } from '../../../services/services';
import Swal from 'sweetalert2';
import ButtonLoading from '../../common/ButtonLoading';

function EditFloorImages({ isModal, setModal, editData ,fetDataFloorImages}) {
    const [image, setImage] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const initialValues = {
        title: editData?.title || "",
        images: '',
        image_alt: editData?.image_alt || '',
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
        validationSchema: FloorImageEditSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('images', image);
            formData.append('title', values.title);
            formData.append('image_alt', values.image_alt);
            try {
              setLoading(true)
                const res = await EditFloorPlanImagesApi(values.images?formData:values,editData.id)
                const { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    setModal(false)
                    resetForm();
                    fetDataFloorImages()
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Floor Plan Updated!',
                      showConfirmButton: false,
                      timer: 1500,
                      width:600,
                    })
                } else if (StatusCode === 6002) {
                    console.log(errors);
                }
            } catch (error) {
                console.log(error);
            } finally {
              setLoading(false)
                setSubmitting(false);
            }
        },
    });
  return (
    <Container className={isModal && "active"}>
    <Overlay onClick={() => setModal(false)}></Overlay>
    <Modal>
        <div>
            <Heding>Edit Floor Plan</Heding>
            <Form onSubmit={handleSubmit}>
                <Cover>
                    <Label>Image ( 512 x 512)</Label>
                    <div className='w-full'>
                        {editData?.images && (
                            <img className='pb-2' src={image?URL.createObjectURL(image):editData?.images} alt="Selected" />
                        )}
                        <Input
                            type="file"
                            name={"images"}
                            onChange={(event) => {
                                handleChange(event);
                                setImage(event.currentTarget.files[0]);
                            }}
                            onBlur={handleBlur}
                            value={values.images}
                            accept=".png, .jpeg, .jpg, .webp"
                        />
                        {touched.images && errors.images && (
                            <div className="text-red-500 text-sm pt-1 -mb-3">{errors.images}</div>
                        )}
                    </div>
                </Cover>
                <Cover>
                            <Label>Image Alt Title</Label>
                            <div className='w-full'>
                                <Input
                                    type="text"
                                    name={"image_alt"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image_alt}
                                />
                                {touched.image_alt && errors.image_alt && (
                                    <div className="text-red-500 text-sm pt-1 -mb-3">{errors.image_alt}</div>
                                )}
                            </div>
                        </Cover>
                <Cover>
                    <Label>Title</Label>
                    <div className='w-full'>
                        <Input
                            type="text"
                            name={"title"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        {touched.title && errors.title && (
                            <div className="text-red-500 text-sm pt-1 -mb-3">{errors.title}</div>
                        )}
                    </div>
                </Cover>
                {isLoading ? (<ButtonLoading/>):(<SubmitBtn>
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

export default EditFloorImages

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
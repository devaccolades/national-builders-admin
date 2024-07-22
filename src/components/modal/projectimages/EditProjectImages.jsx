import React, { useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { ProjectImageEditSchema } from '../../../Validations/Validations';
import Swal from 'sweetalert2';
import { EditProjectImagesApi } from '../../../services/services';
import ButtonLoading from '../../common/ButtonLoading';

function EditProjectImages({ isModal, setModal,editImgData,fetData }) {
  const [isLoading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const initialValues = {
    images: "",
    image_alt: editImgData?.image_alt || ""
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
    validationSchema: ProjectImageEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('images', image);
      formData.append('image_alt', values.image_alt);
      try {
        setLoading(true)
        const res = await EditProjectImagesApi(values.images?formData:values,editImgData.id)
        const { StatusCode, message } = res.data;
        if (StatusCode === 6000) {
          setModal(false)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${message || "Image Updated !"}`,
            showConfirmButton: false,
            timer: 1500,
            width: 600,
          })
          fetData()
          resetForm()
        } else if (StatusCode === 6002) {
          alert('Somthing went wrong')
        }

      } catch (error) {
        console.log(error);
        alert('Something wrong')
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
          <Heding>Edit Images</Heding>
          <Form onSubmit={handleSubmit}>
            <Cover>
              <Label>Image (1080 x 680)</Label>
              <div className='w-full'>
                  <img className='pb-3 ' src={values.images?URL.createObjectURL(image):editImgData?.images} alt="Selected" />
                <Input
                  type="file"
                  name={"images"}
                  onChange={(event) => {
                    handleChange(event);
                    setImage(event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                  value={values.images}
                  accept="logo/*"
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
                  placeholder='Enter Image Alt Title'
                  type="text"
                  name={"image_alt"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.image_alt}
                />
                {touched.image_alt && errors.image_alt && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.image_alt}</div>
                )}
              </div>
            </Cover>
           {isLoading ? (<ButtonLoading/>):( <SubmitBtn>
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

export default EditProjectImages

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
    color: white;
    border-radius: 10px;
 }
`
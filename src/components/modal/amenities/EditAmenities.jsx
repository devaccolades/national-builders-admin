import React, { useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { AmenitiesEditSchema } from '../../../Validations/Validations';
import {  DeleteAmenitieschApi, EditAmenitieschApi } from '../../../services/services';
import Swal from 'sweetalert2';
import ButtonLoading from '../../common/ButtonLoading';

function EditAmenities({ isModal, setModal, editdData }) {
  const [isLoading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
  const initialValues = {
    title: editdData.title || "",
    logo: '',
    image_alt: editdData?.image_alt || ""

  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AmenitiesEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image_alt', values.image_alt);
      if (image){
        formData.append('logo', image);
      }
      try {
        setLoading(true)
        const res = await EditAmenitieschApi(formData, editdData.id)
        const { StatusCode , data} = res.data;
        if (StatusCode === 6000) {
          setModal(false)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Aminity Edited !',
            showConfirmButton: false,
            timer: 1500,
            width: 600,
          })
        } else if (StatusCode === 6002) {
          setModal(false)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            width: 600,
          })
        }
        console.log(res);
      } catch (error) {
        console.log(error);
        alert('Something wrong')
      } finally {
        setLoading(false)
        setSubmitting(false);
      }

    },
  });


  // Delete Branch
  const DeleteBranch = async () => {
    Swal.fire({
      title: `Do you want to delete the ${editdData.title}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await DeleteAmenitieschApi( editdData.id);
          const { StatusCode , message} = res.data;
          if (StatusCode === 6000) {
            setModal(false)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${message} !`,
              showConfirmButton: false,
              timer: 1500,
              width: 600,
            });
          } if (StatusCode === 6002) {
            Swal.fire({
              position: 'top-end',
              icon: 'error', 
              title: `${message} !`,
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
  };
  return (
    <Container className={isModal && "active"}>
    <Overlay onClick={() => setModal(false)}></Overlay>
    <Modal>
      <div>
        <Heding>Edit Amenities</Heding>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Cover>
            <Label>Branch Location</Label>
            <div className='w-full'>
              <Input
              placeholder='Enter title'
                type="text"
                name={"title"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.title}</div>
              )}
            </div>
          </Cover>
          <Cover>
            <Label>Logo ( 100 x 100)</Label>
            <div className='w-full'>
              <img className='pb-2 w-[6rem]' src={image ? URL.createObjectURL(image) : editdData.logo} alt="Selected" />
              <Input
                type="file"
                name={"logo"}
                onChange={(event) => {
                  handleChange(event);
                  setImage(event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                value={values.logo}
                accept="image/*"
              />
              {touched.logo && errors.logo && (
                <div className="text-red-500 text-sm pt-1 -mb-3">{errors.logo}</div>
              )}
            </div>
          </Cover>
          <Cover>
              <Label>Logo Alt Title</Label>
              <div className='w-full'>
                <Input
                  placeholder='Enter Logo Alt Title'
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
          {isLoading? (<ButtonLoading/>):(<SubmitBtn>
            <button type='button' className='delete' onClick={DeleteBranch}>
              Delete
            </button>
            <button type='submit' className='submit'>
              Submit
            </button>
          </SubmitBtn>)}
        </Form>
      </div>
    </Modal>
  </Container>
  )
}

export default EditAmenities

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
  .submit{
  padding:6px 30px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    border-radius: 10px;
    color: #ffffff;

 }
 .delete{
  padding:6px 30px;
  margin-right: 2rem;
    font-size: 16px;
    text-align: center;
    background-color: var(--red);
    color: #ffffff;
    border-radius: 10px;
 }
`
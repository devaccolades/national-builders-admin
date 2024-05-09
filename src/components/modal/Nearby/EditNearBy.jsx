import React, { useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { NearByAddSchema } from '../../../Validations/Validations';
import { EditDistanceApi } from '../../../services/services';
import Swal from 'sweetalert2';
function EditNearBy({ isModal, setModal, fetchData, editData }) {
    const initialValues = {
        project: editData.project || "",
        location_name: editData.location_name || "",
        distance: editData.distance || "",
        measurement_unit: editData.measurement_unit || "",
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
        validationSchema: NearByAddSchema,
        onSubmit: async (values, { setSubmitting }) => {
              try {
                const res = await EditDistanceApi(editData.id,values)
                const { StatusCode , data} = res.data;
                if (StatusCode===6000){
                  setModal(false)
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${values.location_name} Updated !`,
                    showConfirmButton: false,
                    timer: 1500,
                    width:600,
                  })
                  resetForm();
                  fetchData();
                }else if (StatusCode === 6002){
                  alert('Somthing went wrong')
                }
              } catch (error) {
                console.log(error);
                alert('Somthing went wrong',error)
              } finally {
                setSubmitting(false);
              }
        },
    });
  return (
    <Container className={isModal && "active"}>
            <Overlay onClick={() => setModal(false)}></Overlay>
            <Modal>
                <div>
                    <Heding>Edit Near By Locations</Heding>
                    <Form onSubmit={handleSubmit}>
                        <Cover>
                            <Label>Location Name</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter location name'
                                    type="text"
                                    name={"location_name"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location_name}
                                />
                                {touched.location_name && errors.location_name && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.location_name}</div>
                                )}
                            </div>
                        </Cover>

                        <Cover>
                            <Label>Distance (6.6)</Label>
                            <div className='w-full grid grid-cols-2 gap-4'>
                                <div>
                                    <Input
                                        placeholder='Enter Distance'
                                        type="number"
                                        name={"distance"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.distance}
                                    />
                                    {touched.distance && errors.distance && (
                                        <div className="text-red-500 text-sm pt-1 -mb-3">{errors.distance}</div>
                                    )}
                                </div>
                                <div>
                                    <Select name='measurement_unit'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.measurement_unit}
                                    >
                                        <Option value='' disabled>Please select Unit</Option>
                                        <Option value='km'>K.M</Option>
                                        <Option value='meter'>Meter</Option>
                                    </Select>
                                    {touched.measurement_unit && errors.measurement_unit && (
                                        <div className="text-red-500 text-sm pt-1 -mb-3">{errors.measurement_unit}</div>
                                    )}
                                </div>
                            </div>
                        </Cover>
                        <SubmitBtn>
                            <button type='submit'>
                                Submit
                            </button>
                        </SubmitBtn>
                    </Form>
                </div>
            </Modal>
        </Container >
  )
}

export default EditNearBy

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
const Select = styled.select`
  padding: 10px 20px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #5b5b5b;
  border: none;
  outline: none;
  color: #fff;
  /* text-transform: capitalize; */

`;

const Option = styled.option`
    /* text-transform: capitalize; */

`;
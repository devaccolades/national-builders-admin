import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { RentalsEditSchema } from '../../../Validations/Validations';
import Swal from 'sweetalert2';
import { DeleteRentalApi, EditRentaleApi, getBranchDropDownApi } from '../../../services/services';
import ButtonLoading from '../../common/ButtonLoading';

function EditRentals({ isModal, setModal, fetchData, editdata }) {
  const [isLoading, setLoading] = useState(false)
  const [branchDropDown, setBranchDropDown] = useState(null)
  const [image, setImage] = useState(null)
  const initialValues = {
    name: editdata.name || "",
    image: "",
    company_branch: editdata.company_branch.id || "",
    type: editdata.type || "",
    area: editdata.area || "",
    price: editdata.price || "",
    image_alt: editdata?.image_alt || "",
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
    validationSchema: RentalsEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', image);
      formData.append('company_branch', values.company_branch);
      formData.append('type', values.type);
      formData.append('area', values.area);
      formData.append('price', values.price);
      formData.append('image_alt', values.image_alt);
      
      try {
        setLoading(true)
        const res = await EditRentaleApi(values.image ? formData : values, editdata.id)
        const { StatusCode, message } = res.data;
        if (StatusCode === 6000) {
          setModal(false)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${message || "New Rental Added !"}`,
            showConfirmButton: false,
            timer: 1500,
            width: 600,
          })
          resetForm();
          fetchData();
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
  useEffect(() => {
    const fetchDataDropDownd = async () => {
      try {
        const branchRes = await getBranchDropDownApi();
        const branchData = branchRes.data.data || [];

        setBranchDropDown(branchData);
      } catch (error) {
        console.error(error);
        setBranchDropDown([]);
      }
    };
    fetchDataDropDownd();

  }, []);

  // Delete Rentals
  const DeleteRentals = async () => {
    Swal.fire({
      title: '',
      text: `Are you sure you want to delete "${editdata?.name}" rentals?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await DeleteRentalApi(editdata?.id)
          const { StatusCode, message } = res.data;
          if (StatusCode === 6000) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `"${editdata.name}" rental deleted`,
              showConfirmButton: false,
              timer: 1500,
              width: 600,
            })
            fetchData()
            setModal(false)
          } else {
            Swal.fire(message || 'Error!', 'Failed to delete Specification.');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false)
        }

      }
    });
  }
  return (
    <Container className={isModal && "active"}>
      <Overlay onClick={() => setModal(false)}></Overlay>
      <Modal>
        <div>
          <Heding>Edit Rentals</Heding>
          <Form onSubmit={handleSubmit}>
            <Cover>
              <Label>Rental Name</Label>
              <div className='w-full'>
                <Input
                  placeholder='Enter name'
                  type="text"
                  name={"name"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.name}</div>
                )}
              </div>
            </Cover>
            <Cover>
              <Label>Image ( 1080 x 1350)</Label>
              <div className='w-full'>
                <img className='pb-3' src={values.image ? URL.createObjectURL(image) : editdata.image} alt="Selected" />
                <Input
                  type="file"
                  name={"image"}
                  onChange={(event) => {
                    handleChange(event);
                    setImage(event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                  value={values.image}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                />
                {touched.image && errors.image && (
                  <div className="text-red-500 text-sm pt-1 -mb-3">{errors.image}</div>
                )}
              </div>
            </Cover>
            <Cover>
              <Label>Image Alt Title</Label>
              <div className='w-full'>
                <Input
                  placeholder='Image alt title'
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
            <Cover>
              <Label>Rental Branch</Label>
              <div className='w-full'>
                <Select name='company_branch'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_branch}>
                  <option value='' disabled>Please select a branch</option>
                  {branchDropDown && branchDropDown.map((branch, index) => (
                    <Option value={branch?.id}>{branch?.location}</Option>
                  ))}
                </Select>
                {touched.company_branch && errors.company_branch && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.company_branch}</div>
                )}
              </div>
            </Cover>
            <Cover>
              <Label>Rental type</Label>
              <div className='w-full'>
                <Select name='type'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}>
                  <option value='' disabled>Please select a type</option>
                  <Option value='apartment'>apartment</Option>
                  <Option value='villas'>villas</Option>
                  <Option value='commercial'>commercial</Option>
                  <Option value='rental'>rental</Option>
                  <Option value='other'>other</Option>
                </Select>
                {touched.type && errors.type && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.type}</div>
                )}
              </div>
            </Cover>
            <Cover>
              <Label>Area (sq.ft)</Label>
              <div className='w-full'>
                <Input
                  placeholder='Enter name'
                  type="number"
                  name={"area"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.area}
                />
                {touched.area && errors.area && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.area}</div>
                )}
              </div>
            </Cover>
            <Cover>
              <Label>Price /sqft + MMc</Label>
              <div className='w-full'>
                <Input
                  placeholder='Enter name'
                  type="number"
                  name={"price"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />
                {touched.price && errors.price && (
                  <div className="text-red-500 text-sm pt-2 -mb-3">{errors.price}</div>
                )}
              </div>
            </Cover>
            {isLoading ? (<ButtonLoading />) : (<SubmitBtn>
              <button onClick={DeleteRentals} type='button' className='delete'>
                Delete
              </button>
              <button className='submit' type='submit'>
                Update
              </button>
            </SubmitBtn>)}
          </Form>
        </div>
      </Modal>
    </Container>
  )
}


export default EditRentals

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
  gap: 1rem;
  .submit{
  padding:6px 30px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: white;
    border-radius: 10px;
 }
 .delete{
    padding:6px 30px;
    font-size: 16px;
    text-align: center;
    background-color: var(--red);
    color: white;
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
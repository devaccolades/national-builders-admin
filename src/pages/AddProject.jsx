import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { getAllAmenitiesApi, getBranchDropDownApi } from '../services/services'
import { Spinner } from '@material-tailwind/react'
import { MdDeleteForever } from "react-icons/md";
import AddAmenities from '../components/modal/amenities/AddAmenities'
import { MdOutlineErrorOutline } from "react-icons/md";
import ApiFail from '../components/common/ApiFail'
import { ProjectAddSchema } from '../Validations/Validations'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import ProjectSpecifications from '../components/modal/amenities/projectspecifications/ProjectSpecifications'


function AddProject() {
    const navigate = useNavigate()
    const [specifications, setSpecifications] = useState([])
    // Modal
    const [isModal, setModal] = useState(false)
    const [isSpecificationModal, setSpecificationModal] = useState(false)

    // Lising Datas
    const [amenities, setAmenities] = useState(null)
    const [branchDropDown, setBranchDropDown] = useState(null)

    // Thumbails and qr_code 
    const [projectImages, setProjectImages] = useState({ thumbnail: "", qr_code: "" })
    const [images, setImages] = useState([]);

    const [selectedAmenities, setSelectedAmenities] = useState([])

    // Get backend datas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const branchRes = await getBranchDropDownApi();
                const amenitiesRes = await getAllAmenitiesApi();

                const branchData = branchRes.data.data || [];
                const amenitiesData = amenitiesRes.data.data || [];

                setBranchDropDown(branchData);
                setAmenities(amenitiesData);
            } catch (error) {
                console.error(error);
                setBranchDropDown([]);
                setAmenities([]);
            }
        };
        if (!isModal) {
            fetchData();

        }
    }, [isModal]);

    // Form Submission
    const initialValues = {
        name: "",
        location: "",
        description: "",
        rera_number: "",
        company_branch: "",
        type: "",
        bedrooms: "",
        units: "",
        area_from: "",
        area_to: "",
        qr_code: "",
        thumbnail: "",
        amenities: [],
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
        validationSchema: ProjectAddSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            //   formData.append('title', values.title);
            //   formData.append('logo', logo);
            //   try {
            //     const res = await AddAmenitiesApi(formData)
            //     const { StatusCode , message} = res.data;
            //     if (StatusCode===6001){
            //       setModal(false)
            //       Swal.fire({
            //         position: 'top-end',
            //         icon: 'success',
            //         title: `${message || "Amenities Added !"}`,
            //         showConfirmButton: false,
            //         timer: 1500,
            //         width:600,
            //       })
            //       resetForm()
            //     }else if (StatusCode === 602){
            //       alert('Somthing went wrong')
            //     }

            //   } catch (error) {
            //     console.log(error);
            //     alert('Something wrong')
            //   } finally {
            //     setSubmitting(false);
            //   }
        },
    });


    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file);
            newImages.push(imageUrl);
        }

        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <Section>
            <div>
                <ContentTitle text={"Add Projects"} />
            </div>
            {branchDropDown === null || amenities === null ? (
                <Loader>
                    <Spinner className="h-6 w-6" />
                </Loader>
            ) : branchDropDown.length === 0 ? (
                <ApiFail text={"Branch"} />
            ) : amenities.length === 0 ? (
                <ApiFail text={"Amenities"} />
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Cover>
                        <Label>Project Name</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Project Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                name={"name"}
                            />
                            {touched.name && errors.name && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.name}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Location</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Project Location"
                                name={"location"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                            />
                            {touched.location && errors.location && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.location}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Branch</Label>
                        <div>
                            <Select
                                name='company_branch'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.company_branch}>
                                {branchDropDown.map((branch, index) => (
                                    <Option value={branch?.id}>{branch?.location}</Option>
                                ))}
                            </Select>
                            {touched.company_branch && errors.company_branch && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.company_branch}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project type</Label>
                        <div>
                            <Select name='type'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.type}>
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
                        <Label>About / OverView</Label>
                        <div>
                            <TextArea
                                placeholder='Enter Project OverView'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                name={"description"}
                            >
                            </TextArea>
                            {touched.description && errors.description && (
                                <div className="text-red-500 text-sm -mb-3">{errors.description}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Rera Number</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Project Rara number"
                                name={"rera_number"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rera_number}
                            />
                            {touched.rera_number && errors.rera_number && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.rera_number}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Rera Qr Code</Label>
                        <div>
                            {projectImages.qr_code && <img className='w-[10rem] pb-3' src={URL.createObjectURL(projectImages.qr_code)} alt="rara qr code" />}
                            <Input
                                type="file"
                                onChange={(e) => {
                                    handleChange(e);
                                    setProjectImages({ qr_code: e.currentTarget.files[0] })
                                }}
                                onBlur={handleBlur}
                                value={values.qr_code}
                                name={"qr_code"}
                            />
                            {touched.qr_code && errors.qr_code && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.qr_code}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Thumbnail</Label>
                        <div>
                            {projectImages.thumbnail && <img className='pb-3' src={URL.createObjectURL(projectImages.thumbnail)} alt="rara qr code" />}
                            <Input
                                type="file"
                                name={"thumbnail"}
                                onChange={(e) => {
                                    handleChange(e);
                                    setProjectImages({ thumbnail: e.currentTarget.files[0] })
                                }}
                                onBlur={handleBlur}
                                value={values.thumbnail}
                            />
                            {touched.thumbnail && errors.thumbnail && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.thumbnail}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Number Of Bedrooms (eg: 1,2 or 2,3)</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Number Of Bedrooms"
                                name={"bedrooms"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bedrooms}
                            />
                            {touched.bedrooms && errors.bedrooms && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.bedrooms}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Total Units</Label>
                        <div>
                            <Input
                                type="number"
                                placeholder="Enter Total Units"
                                name={"units"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.units}
                            />
                            {touched.units && errors.units && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.units}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Area From & To</Label>
                        <div className='flex gap-5'>
                            <div>
                                <Input
                                    type="number"
                                    placeholder="Enter Area From"
                                    name={"area_from"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.area_from}
                                />
                                {touched.area_from && errors.area_from && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.area_from}</div>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    placeholder="Enter Area To"
                                    name={"area_to"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.area_to}
                                />
                                {touched.area_to && errors.area_to && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.area_to}</div>
                                )}
                            </div>
                        </div>
                    </Cover>
                    <Amenities>
                        <div className='grid grid-cols-3'>
                            <ContentTitle text={"Amenities"} />
                            <div className='flex justify-center items-center'>
                                {touched.amenities && errors.amenities && (
                                    <div className="text-red-500 text-sm  -mt-5">{errors.amenities}</div>
                                )}
                            </div>
                            <Button className='flex justify-end items-start'>
                                <button type='button' onClick={() => setModal(true)}>Add Amenities</button>
                            </Button>
                        </div>
                        <div className='grid grid-cols-4 gap-10 h-max-[30rem] overflow-y-auto scrollbar'>
                            {amenities.map((amenity, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        const updatedAmenities = selectedAmenities.includes(amenity.id)
                                            ? selectedAmenities.filter((selectedId) => selectedId !== amenity.id)
                                            : [...selectedAmenities, amenity.id];
                                        setSelectedAmenities(updatedAmenities);
                                        handleChange({
                                            target: {
                                                name: 'amenities',
                                                value: updatedAmenities,
                                            },
                                        });
                                    }}
                                    className={`flex flex-col justify-center items-center gap-5 p-4 cursor-pointer ${selectedAmenities.some(selectedAmenity => selectedAmenity === amenity.id)
                                        ? 'bg-gray-800 rounded-[1.1rem]'
                                        : ''
                                        }`} >
                                    <img src={amenity.logo} alt="" />
                                    <p>{amenity.title}</p>
                                </div>
                            ))}
                        </div>
                    </Amenities>
                    <SpecificationsList>
                        <div className='grid grid-cols-2'>
                            <ContentTitle text={"Specification"} />
                            <Button className='flex justify-end items-start'>
                                <button onClick={() => setSpecificationModal(true)} >
                                    Add Specification
                                </button>
                            </Button>
                        </div>
                            <div className='grid grid-cols-3 gap-8'>
                                {specifications.map((specific,index)=>(
                                    <div key={index}>
                                        <p>{specific?.title}</p>
                                    <p>{specific?.description}</p>
                                    </div>
                                ))}
                            </div>
                    </SpecificationsList>
                    <MultipleImages>
                        <div className='grid grid-cols-2'>
                            <ContentTitle text={"Images"} />
                            <Button className='flex justify-end items-start'>
                                <label htmlFor="imageUpload" className="cursor-pointer">
                                    Add Image
                                </label>
                                <input id="imageUpload" multiple type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                            </Button>
                        </div>
                        <div className='grid grid-cols-3 gap-8'>
                            {images.map((imageUrl, index) => (
                                <ImageContainer key={index}>
                                    <MdDeleteForever onClick={() => removeImage(index)} className='delete-icon' />
                                    <img className='mx-auto' src={imageUrl} alt={`Image ${index}`} />
                                </ImageContainer>
                            ))}
                        </div>
                    </MultipleImages>
                    <SubmitButton>
                        <button type='button' onClick={() => navigate('/project/')} className='cancel'>Cancel</button>
                        <button type='submit' className='submit'>Submit</button>
                    </SubmitButton>
                </Form>
            )}
            <AddAmenities isModal={isModal} setModal={setModal} />
            <ProjectSpecifications isModal={isSpecificationModal} setModal={setSpecificationModal} setSpecifications={setSpecifications} />
        </Section>
    )
}

export default AddProject

const Section = styled.div``
const Form = styled.form`

`
const Cover = styled.div`
 width: 80%;
    margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  div{
    width: 100%;
  }
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
  text-transform: capitalize;

`;

const Option = styled.option`
    text-transform: capitalize;

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

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;

const Amenities = styled.div`
border: 1px solid rgb(91, 91, 91);
border-radius: 15px;
padding: 30px;
margin-top: 3rem;

.scrollbar {
    scrollbar-width: thin; 
    scrollbar-color: #4a4a4a #232327; 
}

.scrollbar::-webkit-scrollbar {
    width: 10px;
}

.scrollbar::-webkit-scrollbar-track {
    background: #e0e0e0; 
}

.scrollbar::-webkit-scrollbar-thumb {
    background: #4a4a4a; 
    border-radius: 5px; 
}

.scrollbar::-webkit-scrollbar-button {
    display: none;
}

.scrollbar::-webkit-scrollbar-corner {
    display: none;
}



`

const Button = styled.h3`
button{
    padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
 }
 label{
    padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
 }
`;
const ImageContainer = styled.div`
 position: relative;
    display: inline-block;
    margin-bottom: 8px; 
    .delete-icon {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 8px; 
    right: 8px; 
    color: red; 
    cursor: pointer;
    z-index: 1; 
}

img {
    width: 100%;
    max-width: 100%; 
    height: auto;
}
`
const SubmitButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 3rem;
    padding-bottom: 5rem;
    gap: 1rem;
    .submit{
        padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    }
    .cancel{
        padding:10px 26px;
    font-size: 16px;
    text-align: center;
    color: red;
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    }
`
const MultipleImages = styled.div`
border: 1px solid rgb(91, 91, 91);
border-radius: 15px;
padding: 30px;
margin-top: 3rem;
`
const SpecificationsList = styled.div`
border: 1px solid rgb(91, 91, 91);
border-radius: 15px;
padding: 30px;
margin-top: 3rem;
`
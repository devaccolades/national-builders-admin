import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { AddProjectApi, getBranchDropDownApi } from '../services/services'
import { Spinner } from '@material-tailwind/react'
import { ProjectAddSchema } from '../Validations/Validations'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ButtonLoading from '../components/common/ButtonLoading'

function AddProject() {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Lising Datas
    const [branchDropDown, setBranchDropDown] = useState(null)

    // Thumbails and qr_code 
    const [projectImages, setProjectImages] = useState({ thumbnail: "", qr_code: "",logo:"" })


    // Get backend datas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const branchRes = await getBranchDropDownApi();

                const branchData = branchRes.data.data || [];

                setBranchDropDown(branchData);
            } catch (error) {
                console.error(error);
                setBranchDropDown([]);
            }
        };
        fetchData();

    }, []);

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
        logo:"",
        thumbnail: "",
        slug: "",
        thumbnail_alt: "",
        qr_code_alt: "",
        status: "",
        iframe: "",
        meta_title: "",
        meta_description: ""
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
            for (const key in values) {
                if (Object.hasOwnProperty.call(values, key)) {
                    formData.append(key, values[key]);
                }
            }
            formData.append('qr_code', projectImages.qr_code);
            formData.append('thumbnail', projectImages.thumbnail);
            if (projectImages.logo){
                formData.append('logo', projectImages.logo);
            }
            try {
                setLoading(true)
                const res = await AddProjectApi(formData)
                const { StatusCode, message, data } = res.data;
                if (StatusCode === 6001) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${message || "Project Added !"}`,
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                    })
                    resetForm()
                    navigate('/project')
                } else if (StatusCode === 6002) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: `${(data && data.name && data.name[0]) || (data && data.slug && data.slug[0]) || "something wrong"}`,
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                    })
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

    const handleSlugChange = (e) => {
        const lowercaseValue = e.target.value.toLowerCase();
        handleChange({
            target: {
                name: 'slug',
                value: lowercaseValue,
            },
        });
    };


    return (
        <Section>
            <div>
                <ContentTitle text={"Add Projects"} />
            </div>
            {branchDropDown === null ? (
                <Loader>
                    <Spinner className="h-6 w-6" />
                </Loader>
            ) : branchDropDown.length === 0 ? (
                <div className='flex flex-col justify-center items-center'>
                    <p>Before adding a project, please make sure to create contact first.
                    </p>
                    <button className='GotoBtn' onClick={() => navigate('/contact')}>Go to Contact</button>
                </div>
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
                                <option value='' disabled>Please select a branch</option>
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
                                value={values.type}
                                className='capitalize'
                                >
                                <option value='' disabled>Please select a type</option>
                                <Option value='apartment'>apartment</Option>
                                <Option value='villas'>villas</Option>
                                <Option value='commercial'>commercial</Option>
                                <Option value='rental'>rental</Option>
                                <Option value='residential cum commercial'>residential cum commercial</Option>
                                <Option value='residential'>residential</Option>
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
                        <Label>Project Logo</Label>
                        <div>
                            {projectImages.logo && <img className='w-[10rem] pb-3' src={URL.createObjectURL(projectImages.logo)} alt="logo" />}
                            <Input
                                accept=".png, .jpeg, .jpg, .webp"
                                type="file"
                                onChange={(e) => {
                                    handleChange(e);
                                    setProjectImages({ ...projectImages, logo: e.currentTarget.files[0] })
                                }}
                                onBlur={handleBlur}
                                value={values.logo}
                                name={"logo"}
                            />
                            {touched.logo && errors.logo && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.logo}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project RERA Number</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Project RERA number"
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
                        <Label>Project RERA Qr Code</Label>
                        <div>
                            {projectImages.qr_code && <img className='w-[10rem] pb-3' src={URL.createObjectURL(projectImages.qr_code)} alt="rara qr code" />}
                            <Input
                                accept=".png, .jpeg, .jpg, .webp"
                                type="file"
                                onChange={(e) => {
                                    handleChange(e);
                                    setProjectImages({ ...projectImages, qr_code: e.currentTarget.files[0] })
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
                        <Label>Qr Alt Tag</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter The Qr Alt Tag"
                                name={"qr_code_alt"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.qr_code_alt}
                            />
                            {touched.qr_code_alt && errors.qr_code_alt && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.qr_code_alt}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Thumbnail</Label>
                        <div>
                            {projectImages.thumbnail && <img className='pb-3' src={URL.createObjectURL(projectImages.thumbnail)} alt="rara qr code" />}
                            <Input
                                accept=".png, .jpeg, .jpg, .webp"
                                type="file"
                                name={"thumbnail"}
                                onChange={(e) => {
                                    handleChange(e);
                                    setProjectImages({ ...projectImages, thumbnail: e.currentTarget.files[0] })
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
                        <Label>Thumbnail Alt Tag</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter The Thumbnail Alt Tag"
                                name={"thumbnail_alt"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.thumbnail_alt}
                            />
                            {touched.thumbnail_alt && errors.thumbnail_alt && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.thumbnail_alt}</div>
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
                        <Label>Area From & To (sq. ft)</Label>
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
                    <Cover>
                        <Label>Project Project Location Map (Iframe link)</Label>
                        <div>
                            <TextArea
                                placeholder='Paste Project Location Map link'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.iframe}
                                name={"iframe"}
                            >
                            </TextArea>
                            {touched.iframe && errors.iframe && (
                                <div className="text-red-500 text-sm -mb-3">{errors.iframe}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Meta Title</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Meta Title"
                                name={"meta_title"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.meta_title}
                            />
                            {touched.meta_title && errors.meta_title && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.meta_title}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Meta Description</Label>
                        <div>
                            <TextArea
                                placeholder='Enter Meta Description'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.meta_description}
                                name={"meta_description"}
                            >
                            </TextArea>
                            {touched.meta_description && errors.meta_description && (
                                <div className="text-red-500 text-sm -mb-3">{errors.meta_description}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Slug</Label>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Project Slug"
                                name={"slug"}
                                onChange={handleSlugChange}
                                onBlur={handleBlur}
                                value={values.slug}
                            />
                            {touched.slug && errors.slug && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.slug}</div>
                            )}
                        </div>
                    </Cover>
                    <Cover>
                        <Label>Project Status</Label>
                        <div>
                            <Select name='status'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}>
                                <Option value='' disabled>Please select a status</Option>
                                <Option value='new launch'>new launch</Option>
                                <Option value='on going'>on going</Option>
                                <Option value='ready to occupy'>ready to occupy</Option>
                                <Option value='nearing completion'>nearing completion</Option>
                                <Option value='under construction'>under construction</Option>
                                <Option value='sold out'>sold out</Option>
                            </Select>
                            {touched.status && errors.status && (
                                <div className="text-red-500 text-sm pt-2 -mb-3">{errors.status}</div>
                            )}
                        </div>
                    </Cover>

                    {isLoading ? (
                        <div className='pt-5 pb-5'>
                            <ButtonLoading />
                        </div>
                    ) : (
                        <>
                            <SubmitButton>
                                <button type='button' onClick={() => navigate('/project/')} className='cancel'>Cancel</button>
                                <button type='submit' className='submit'>Submit</button>
                            </SubmitButton>

                        </>
                    )}

                </Form>
            )}
        </Section>
    )
}

export default AddProject

const Section = styled.div`
    .GotoBtn{
    margin-top: 20px;
    padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
    }
`
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
  /* text-transform: capitalize; */

`;

const Option = styled.option`
    /* text-transform: capitalize; */

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

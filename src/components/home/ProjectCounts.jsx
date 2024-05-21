import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import { AddProjectCountHomepageApi, EditProjectCountHomepageApi, getProjectCountHomePageApi } from '../../services/services';
import { Spinner } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { ProjectCountHomePageSchema } from '../../Validations/Validations';
import Swal from 'sweetalert2';
import ButtonLoading from '../common/ButtonLoading';

function ProjectCounts() {
    const [isLoading, setLoading] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [data, setData] = useState(null)

    const fetchData = async () => {
        try {
            const res = await getProjectCountHomePageApi()
            const { StatusCode, data } = res.data;
            if (StatusCode === 6000) {
                setData(data)
                if (data.length > 0) {
                    initialValues.launched = data[0].launched;
                    initialValues.projectcompleted = data[0].projectcompleted;
                    initialValues.readytooccupy = data[0].readytooccupy;
                    initialValues.ongoing = data[0].ongoing;
                    resetForm(initialValues);
                }
            } else {
                setData([])
            }
        } catch (error) {
            setData([])
        }
    }
    useEffect(() => {
        fetchData()

    }, [])
    const initialValues = {
        launched: "",
        projectcompleted: "",
        readytooccupy: "",
        ongoing: ""
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
        validationSchema: ProjectCountHomePageSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setLoading(true)
                const res = data.length === 0 ? await AddProjectCountHomepageApi(values) : await EditProjectCountHomepageApi(values, data[0]?.id);
                const { StatusCode } = res.data;
                if (StatusCode === 6000) {
                    fetchData()
                    setEdit(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "Project's Count Updated !",
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                    })
                    // resetForm();
                } if (StatusCode === 6001) {
                    fetchData()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "Project's Count Added !",
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                    })
                    // resetForm();
                }

                else if (StatusCode === 6002) {
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
        <Section>

            {data === null ? (
                <Loader>
                    <Spinner className="h-6 w-6" />
                </Loader>
            ) : (isEdit || data.length === 0 ? (
                <>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Launched</Th>
                                <Th>Project's Completed
                                </Th>
                                <Th>Ready to Move In
                                </Th>
                                <Th>Ongoing</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                    </Table>
                    <form onSubmit={handleSubmit} className='grid grid-cols-5 gap-2'>
                        <div>
                            <Input
                                type="number"
                                placeholder="Launched Project's Count"
                                name={"launched"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.launched}
                            />
                            {touched.launched && errors.launched && (
                                <div className="text-red-500 text-sm pt-1 -mb-3">{errors.launched}</div>
                            )}
                        </div>
                        <div>
                            <Input
                                type="number"
                                placeholder="Completed Project's Count"
                                name={"projectcompleted"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projectcompleted}
                            />
                            {touched.projectcompleted && errors.projectcompleted && (
                                <div className="text-red-500 text-sm pt-1 -mb-3">{errors.projectcompleted}</div>
                            )}
                        </div>
                        <div>
                            <Input
                                type="number"
                                placeholder="Ready To Move In Project's Count"
                                name={"readytooccupy"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.readytooccupy}
                            />
                            {touched.readytooccupy && errors.readytooccupy && (
                                <div className="text-red-500 text-sm pt-1 -mb-3">{errors.readytooccupy}</div>
                            )}
                        </div>
                        <div>
                            <Input
                                type="number"
                                placeholder="Ongoing Project Count"
                                name={"ongoing"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ongoing}
                            />
                            {touched.ongoing && errors.ongoing && (
                                <div className="text-red-500 text-sm pt-1 -mb-3">{errors.ongoing}</div>
                            )}
                        </div>
                       {isLoading?(<ButtonLoading/>):( <button type='submit' className='bg-[--lightblue] text-black h-12 rounded-[0.6rem]'>{data.length === 0 ? "Add" : "Update"}</button>)}
                    </form>
                </>
            ) : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Launched</Th>
                            <Th>Project's Completed
                            </Th>
                            <Th>Ready to Move In
                            </Th>
                            <Th>Ongoing</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((count, index) => (
                            <Tr className='cursor-pointer'>
                                <Td >{count?.launched}</Td>
                                <Td >{count?.projectcompleted}</Td>
                                <Td >{count?.readytooccupy}</Td>
                                <Td >{count?.ongoing}</Td>
                                <Td onClick={() => setEdit(true)}><FaEdit className='mx-auto w-6 h-6 cursor-pointer' /></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ))}
        </Section>
    )
}

export default ProjectCounts

const Section = styled.div`
    width: 100%;
`

const Table = styled.table`
   width: 100%;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
`;

const Thead = styled.thead`
`;

const Tr = styled.tr`
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-bottom: 1rem;
    gap:4px;
`;

const Th = styled.th`
    background-color: #1b1d21;
    font-size:16px;
    text-transform: capitalize;
    padding:10px;
    border: 1px solid #525355;
`;

const Tbody = styled.tbody`
    /* margin-top: -12px; */
`;

const Td = styled.td`
/* margin-top: -12px; */
    overflow-x: auto;
    text-align: center;
    font-size:16px;
    text-transform: capitalize;
    height:6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #525355;
    background-color: #3a3838;
    &::-webkit-scrollbar {
        display: none;
    }
    img{
        /* width: 6rem; */
        padding: 4px;
        margin: 0 auto;
    }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
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

const Form = styled.form``
import React, { useState } from 'react'
import styled from 'styled-components';
import { useFormik } from 'formik';
import { NewsAndEventsAddSchema } from '../../../Validations/Validations';
import Swal from 'sweetalert2';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats, } from "../../utils/EditorToolbar";
import { AddNewsAndEventsApi } from '../../../services/services';
function AddNewsAndEvents({ isModal, setModal, fetchData }) {
    const [image, setImage] = useState(null)
    const initialValues = {
        title: "",
        image: "",
        body: "",
        image_alt: "",
        meta_tag: "",
        youtube_link: "",
        meta_description: "",
        slug: "",
    }
    const {
        values,
        errors,
        touched,
        resetForm,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: NewsAndEventsAddSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('image', image);
            formData.append('body', values.body);
            formData.append('image_alt', values.image_alt);
            formData.append('youtube_link', values.youtube_link);
            formData.append('meta_tag', values.meta_tag);
            formData.append('meta_description', values.meta_description);
            formData.append('slug', values.slug);
            try {
                const res = await AddNewsAndEventsApi(formData)
                const { StatusCode, message } = res.data;
                if (StatusCode === 6001) {
                    setModal(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${message || "News & Events Added !"}`,
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
                setSubmitting(false);
            }
        },
    });
    return (
        <Container className={isModal && "active"}>
            <Overlay onClick={() => setModal(false)}></Overlay>
            <Modal>
                <div>
                    <Heding>Add News & Events</Heding>
                    <Form onSubmit={handleSubmit}>
                        <Cover>
                            <Label>Image ( 1280 x 720)</Label>
                            <div className='w-full'>
                                {values.image && (
                                    <img className='pb-3' src={URL.createObjectURL(image)} alt="Selected" />
                                )}
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
                            <Label>Title</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter a title'
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
                            <Label>Content</Label>
                            <div className='w-full'>
                                <TextEditor>
                                    <EditorToolbar />
                                    <ReactQuill
                                        theme="snow"
                                        name="body"
                                        onBlur={handleBlur}
                                        value={values.body}
                                        onChange={(content) => {
                                            setFieldValue("body", content);
                                        }}
                                        className="h-[15rem] mx-h-[15rem] overflow-y-auto w-full"
                                        modules={modules}
                                        formats={formats}
                                    />
                                </TextEditor>
                                {touched.body && errors.body && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.body}</div>
                                )}
                            </div>
                        </Cover>

                        <Cover>
                            <Label>Youtube Link</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter the youtube link'
                                    type="text"
                                    name={"youtube_link"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.youtube_link}
                                />
                                {touched.youtube_link && errors.youtube_link && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.youtube_link}</div>
                                )}
                            </div>
                        </Cover>
                        <Cover>
                            <Label>Alt Tag</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter a alt tag'
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
                            <Label>Meta title</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter a meta title'
                                    type="text"
                                    name={"meta_tag"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.meta_tag}
                                />
                                {touched.meta_tag && errors.meta_tag && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.meta_tag}</div>
                                )}
                            </div>
                        </Cover>
                        <Cover>
                            <Label>Meta Description</Label>
                            <div className='w-full'>
                                <TextArea
                                    placeholder='Enter a meta description'
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
                            <Label>Slug</Label>
                            <div className='w-full'>
                                <Input
                                    placeholder='Enter a slug'
                                    type="text"
                                    name={"slug"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.slug}
                                />
                                {touched.slug && errors.slug && (
                                    <div className="text-red-500 text-sm pt-2 -mb-3">{errors.slug}</div>
                                )}
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
        </Container>
    )
}

export default AddNewsAndEvents

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
const TextEditor = styled.div`
  width: 100%;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #5b5b5b;
  border: none;
  outline: none;
  color: #fff;
  .ql-toolbar{
    background-color:#fff;
  }
`;
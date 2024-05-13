import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ContentTitle from '../components/common/ContentTitle';
import BasicDetails from '../components/pages/editproject/BasicDetails';
import ImageList from '../components/pages/editproject/ImageList';
import AmenitiesList from '../components/pages/editproject/AmenitiesList';
import SpecificationAndNearBy from '../components/pages/editproject/SpecificationAndNearBy';
import { DeleteProjectApi, getSingleProjectsApi } from '../services/services';
import NoDataFound from '../components/common/NoDataFound';
import { Spinner } from '@material-tailwind/react';
import Swal from 'sweetalert2';

function EditProject() {
    const { slug } = useParams();
    const navigate = useNavigate()
    const [tabs, setTabs] = useState('basicdetails')
    const [data, setData] = useState(null)

    useEffect(() => {
        const getSingleProjectDetails = async () => {
            try {
                const res = await getSingleProjectsApi(slug);
                const { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    setData(data);

                } else {
                    navigate('/project');
                }
            } catch (error) {
                console.log(error);
                navigate('/project');
            }
        };

        if (slug) {
            getSingleProjectDetails();
        } else {
            navigate('/project');
        }
    }, [slug]);

    const ProjectDelete= async ()=>{
        Swal.fire({
            title: `Do you want to delete the "${data?.name}" project?`,
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const res = await DeleteProjectApi(data?.id)
                const { StatusCode, message } = res.data;
                if (StatusCode === 6000) {
                  navigate('/project');
                } else {
                  Swal.fire(message || 'Error!', 'Failed to delete Specification.');
                }
              } catch (error) {
                console.error('Error:', error);
                navigate('/project');
              }
      
            }
          });
    }

    return (
        <Section>
            <div className='grid grid-cols-3'>
                <ContentTitle text={"Edit project"} />
                <p className='text-[23px] text-[--lightblue]'>{data?.name}</p>
                <Button>
                    <button onClick={()=>ProjectDelete()}>Delete</button>
                </Button>
            </div>
            {data === null ? (
                <Loader>
                    <Spinner className="h-6 w-6" />
                </Loader>
            ) : !data? (
                <>
                <p className='text-center'>id Not Found</p>
                <NoDataFound />
                </>
            ) : (
                <>
                    <div className='flex flex-row '>
                        <p onClick={() => setTabs('basicdetails')} className={`${tabs === 'basicdetails' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Basic Details</p>
                        <p onClick={() => setTabs('images')} className={`${tabs === 'images' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Images</p>
                        <p onClick={() => setTabs('amenities')} className={`${tabs === 'amenities' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Amenities</p>
                        <p onClick={() => setTabs('specification')} className={`${tabs === 'specification' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Specification & Near by Locations</p>
                    </div>
                    {tabs === 'basicdetails' && data && <BasicDetails datas={data} slug={slug}/>}
                    {tabs === 'images' && data && <ImageList id={data.id}/>}
                    {tabs === 'amenities' && data && <AmenitiesList projectId={data.id} />}
                    {tabs === 'specification' && data &&<SpecificationAndNearBy projectId={data.id} />}
                </>
            )}


        </Section>
    )
}

export default EditProject

const Section = styled.div``

const Button = styled.h3`
display: flex;
justify-content: end;
align-items: center;
 button{
    padding:10px 26px;
    font-size: 16px;
    text-align: center;
    background-color: var(--red);
    color: white;
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
 }
`;
const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
`;
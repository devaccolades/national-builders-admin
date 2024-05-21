import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import ContentTitle from '../components/common/ContentTitle'
import { baseUrl } from '../api/api';import axios from 'axios';
import EnquiryList from '../components/enquiry/EnquiryList';
import RentalEnquiryList from '../components/enquiry/RentalEnquiryList';
import SelectEnquiry from '../components/modal/enquiry/SelectEnquiry';

function Enquiry() {
    const [tabs, setTabs] = useState('enquiry')
    const [isModal,setModal] = useState(false)

    

    return (
        <Section>
            <div className='grid grid-cols-2'>
                <ContentTitle text={"Enquiries"} />
                <Print className='flex justify-end items-start'>
                    <button className='bg-[lightblue]' onClick={()=>setModal(true)}>Print</button>
                </Print>
            </div>
            <div className='flex flex-row -mt-6 mb-8'>
                <p onClick={() => setTabs('enquiry')} className={`${tabs === 'enquiry' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Enquiry</p>
                <p onClick={() => setTabs('rentalenquiry')} className={`${tabs === 'rentalenquiry' ? "bg-blue-100 bg-opacity-20 border-blue-400 text-blue-400 border-b-2" : "bg-gray-800"}   py-4 px-8 cursor-pointer`}>Rental Enquiry</p>
            </div>
         {tabs==='enquiry' && <EnquiryList/>}
         {tabs === 'rentalenquiry' && <RentalEnquiryList/>}
         <SelectEnquiry isModal={isModal} setModal={setModal}/>
        </Section>
    )
}

export default Enquiry

const Section = styled.div``

const Print = styled.h3`
 button{
    padding:14px 20px;
    font-size: 13px;
    text-align: center;
    background-color: var(--lightblue);
    color: #fff;
    border:none;
    border-radius: 10px;
 }
`;
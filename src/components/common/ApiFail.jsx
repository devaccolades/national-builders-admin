import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

function ApiFail({ text }) {
    return (
        <div className='flex flex-col items-center gap-5'>
            <MdOutlineErrorOutline className='w-20 h-20 text-red-500' />
            <p className='text-center'>{text} Api Not Working...</p>
        </div>
    )
}

export default ApiFail
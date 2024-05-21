import { Spinner } from '@material-tailwind/react'
import React from 'react'
import styled from 'styled-components'

function ButtonLoading() {
    return (
        <Container className='w-full flex justify-end'>
            <button type='button' disabled >
                <Spinner className="h-6 w-6" />
            </button>
        </Container>

    )
}

export default ButtonLoading

const Container = styled.div`
     button{
        padding:10px 50px;
    font-size: 16px;
    text-align: center;
    background-color: var(--lightblue);
    color: var(--darkgrey);
    border: 1px solid var(--bordercolor);
    border-radius: 10px;
     }
`
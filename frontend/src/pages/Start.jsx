import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Start = () => {

    return (
        <div>
            <div className='bg-cover bg-center bg-[url("/images/start.jpg")] h-screen  flex justify-between flex-col w-full'>
                <div className='bg-white/30 backdrop-blur-md p-5'>
                    <h1 className='text-black font-bold text-5xl'>Raahi</h1>
                </div>

                <div className='pb-9 pl-4 pr-4'>
                    <Link to='/loginUser' className='flex items-center justify-center w-full bg-white/80 backdrop-blur-md text-black font-bold text-xl py-3 rounded-lg mt-5'>Continue</Link>
                </div>

            </div>
        </div>
    )
}

export default Start
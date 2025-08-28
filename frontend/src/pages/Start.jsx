import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Start = () => {
    const handleSendNotification = async () => {
        const token = localStorage.getItem("fcmToken");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-notification`, {
                token: token, 
                title: "Hello from Raahi!",
                body: "This is your test notification."
            });
            if (response.data.success) {
            } else {
                alert("Failed to send notification.");
            }
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Error sending notification. Check console.");
        }
    };
    return (
        <div>
            <div className='bg-cover bg-center bg-[url("/images/start.jpg")] h-screen  flex justify-between flex-col w-full'>
                <div className='bg-white/30 backdrop-blur-md p-5'>
                    <h1 className='text-black font-bold text-5xl'>Raahi</h1>
                </div>

                <div className='pb-9 pl-4 pr-4'>
                    <button onClick={handleSendNotification} className='flex items-center justify-center w-full translate-y-28 bg-white/80 backdrop-blur-md text-black font-bold text-xl py-3 rounded-lg mt-5'>Send Notification</button>
                </div>

                <div className='pb-9 pl-4 pr-4'>
                    <Link to='/loginUser' className='flex items-center justify-center w-full bg-white/80 backdrop-blur-md text-black font-bold text-xl py-3 rounded-lg mt-5'>Continue</Link>
                </div>

            </div>
        </div>
    )
}

export default Start
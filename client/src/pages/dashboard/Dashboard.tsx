import React from 'react';
import { useUserCtx } from '../../store/UserContext';


const Dashboard: React.FC = () => {
    const {user} = useUserCtx();

    return (
        <>
            <div className='w-full max-w-screen-2xl mx-auto flex flex-col justify-center items-center gap-5'>
                <header className='w-full p-3'>
                    <h1 className='font-[800] text-3xl '>Hello {user?.name}</h1>
                </header>
                <div className='w-full grid grid-cols-6 gap-5'>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
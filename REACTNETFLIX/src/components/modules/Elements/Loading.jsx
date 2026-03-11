import React from 'react'
import { JUMBOTRON_IMAGE } from '@/constants/listAsset' // Pastikan path import ini sesuai dengan file constants kamu

const Loading = () => {
    return (
        <div className='relative w-full h-screen bg-black'>
            {/* Background Image */}
            <img
                src={JUMBOTRON_IMAGE}
                className='absolute top-0 left-0 w-full h-full object-cover opacity-12'
                alt="Loading background"
            />

            {/* Loading Content - Dikasih z-10 supaya muncul DI ATAS gambar */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4 text-white'>
                {/* Saya tambah text-red-600 opsional biar loadingnya merah kayak Netflix */}
                <span className="loading loading-ring w-44 text-red-600"></span>
                <p className="font-bold text-2xl text-center">Mohon Tunggu Sebentar..</p>
            </div>
        </div>
    )
}

export default Loading
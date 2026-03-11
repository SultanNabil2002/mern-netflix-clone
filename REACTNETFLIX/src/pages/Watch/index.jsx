import BrowseLayout from '@/components/Layouts/BrowseLayout'
import React from 'react'
import ReactPlayer from 'react-player'

import { GoChevronLeft } from 'react-icons/go'
import { useNavigate, useParams } from 'react-router-dom'

const Watch = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <BrowseLayout>
            <div
                onClick={() => navigate("/browse")}
                className='absolute top-20 left-10 hover:text-white transition-all cursor-pointer z-11'
            >
                <GoChevronLeft size={32} />
            </div>
            <ReactPlayer
                src={"https://youtube.com/watch?v=" + id}
                width={"100%"}
                height={"100vh"}
                playing={true}
                muted={false}
                controls={false}
            />
        </BrowseLayout>
    )
}

export default Watch
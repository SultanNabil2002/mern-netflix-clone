import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { GoPlay, GoMute, GoUnmute } from 'react-icons/go'
import { getMoviesByType } from '@/utils/getMoviesByType'
import { useAtom } from 'jotai'
import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'

const Jumbotron = () => {
    const navigate = useNavigate()

    const [idMovie, setIdMovie] = useState(null)
    const [, setIdMovieAtom] = useAtom(idMovieAtom)

    const [, setIsOpenModal] = useAtom(isOpenModalAtom)

    const [isMute, setIsMute] = useState(true)
    const [topMovies, setTopMovies] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        getMoviesByType({ moviesType: "top_rated" }).then(result => {
            setTopMovies(result[0])
            setIdMovie(result[0].id)
        }).finally(() => getVideoUrl({ movie_id: idMovie }).then(result => setVideoUrl(result)))
    }, [idMovie])

    return (
        <div className='relative h-[500px] w-full'>
            <ReactPlayer
                src={videoUrl ? "https://www.youtube.com/watch?v=" + videoUrl : null}
                width='100%'
                height='700px'
                playing={true}
                muted={isMute}
                controls={false}
                style={{ opacity: "75%" }}

            />

            <div className='absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md mt-8'>
                <div className='flex flex-col gap-4 text-white'>
                    <h1 className='text-3xl sm:text-5xl font-black'>{topMovies.title}</h1>
                    <p className='hidden lg:block'>{topMovies.overview}</p>
                </div>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => {
                            navigate("/watch/" + videoUrl)
                            setIsMute(true)
                        }}
                        className='bg-gray-200 py-2 px-8 rounded-md text-xl font-bold text-black flex items-center gap-1 cursor-pointer'><GoPlay />Play
                    </button>
                    <button
                        onClick={() => {
                            setIdMovieAtom(idMovie)
                            setIsOpenModal(true)
                        }}
                        className='bg-stone-600/80 py-2 px-8 rounded-md text-white cursor-pointer'
                    >
                        More Detail
                    </button>
                </div>
            </div>

            <div className='absolute right-6 top-65 bottom-1/2 -translate-y-1/2 text-white'>
                <div
                    className='border rounded-full p-2 cursor-pointer'
                    onClick={() => setIsMute(!isMute)}
                >
                    {isMute ? <GoMute size={24} /> : <GoUnmute size={24} />}
                </div>
            </div>
        </div>
    )
}

export default Jumbotron
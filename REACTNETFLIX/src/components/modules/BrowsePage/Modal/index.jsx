import React, { useEffect, useState } from 'react'
import Recommendation from '@mods/BrowsePage/Modal/Recommendation'
import ReactPlayer from 'react-player'

import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import { MdClose } from "react-icons/md"
import { GoPlay, GoPlusCircle } from 'react-icons/go'
import { getMovieDetail } from '@/utils/getMovieDetail'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
    const navigate = useNavigate()

    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)

    const [movieDetail, setMovieDetail] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        if (idMovie && isOpenModal) {
            getMovieDetail({ movie_id: idMovie }).then(result => setMovieDetail(result))

            getVideoUrl({ movie_id: idMovie }).then(result => setVideoUrl(result))
        }
    }, [idMovie, isOpenModal])

    const genreMapping = (genres) => {
        if (genres) {
            let result = "";
            genres.map((genre, index) => {
                if (index === genres.length - 1) {
                    result += genre.name
                } else {
                    result += genre.name + ", " // Saya tambah spasi biar rapi
                }
            })
            return result;
        }
    }

    return (
        <dialog className={`modal ${isOpenModal ? 'modal-open' : ""}`}>
            <div className='modal-box w-full max-w-screen-md p-0'>
                <div className='relative'>
                    <div className='h-[450px] w-full'>
                        <ReactPlayer
                            width={"100%"}
                            height={"100%"}
                            playing={true}
                            muted={true}
                            loop={true}
                            src={`https://youtube.com/watch?v=${videoUrl}`}
                        />
                    </div>
                    <button
                        onClick={() => setIsOpenModal(false)}
                        className='absolute top-2 right-2 rounded-full border p-1 cursor-pointer'>
                        <MdClose size={24} />
                    </button>
                    <div className='absolute bottom-1/2 left-10'>
                        <h2 className='text-4xl font-black text-white'>{movieDetail?.title}</h2>
                    </div>
                    <div className='absolute bottom-1/2 translate-y-14 left-10'>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => {
                                    navigate("/watch/" + videoUrl)
                                    setIsOpenModal(false)
                                    setVideoUrl(null)
                                    setMovieDetail([])
                                    setIdMovie(null)
                                }}
                                className='cursor-pointer bg-slate-50 w-32 text-black flex items-center justify-center gap-1 p-1.5 rounded-md font-bold text-xl'
                            >
                                <GoPlay size={32} /> Play
                            </button>
                            <button
                                className='cursor-pointer text-slate-200'><GoPlusCircle size={44} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-1 px-4 py-2 text-white'>
                    <div>
                        <div className='flex gap-2'>
                            <p>{movieDetail?.release_date}</p>
                            <p className='text-green-400/90'>{movieDetail?.runtime} Minutes</p>
                        </div>
                        <p className='mt-4'>{movieDetail?.overview}</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p>Genre: {genreMapping(movieDetail?.genres)}</p>
                        <p>Popularity: {movieDetail?.popularity}</p>
                    </div>
                </div>
                <Recommendation />
            </div>
        </dialog>
    )
}

export default Modal
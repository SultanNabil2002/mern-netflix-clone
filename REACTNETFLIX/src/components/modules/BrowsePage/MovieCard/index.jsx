import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Skeleton from './Skeleton'
import { GoPlay, GoPlusCircle, GoChevronDown, GoTrash } from 'react-icons/go'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, isFetchingAtom, isOpenModalAtom, tokenAtom } from '@/jotai/atoms'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'
import { apiInstanceExpress } from '@/utils/apiInstance'
import Notification from '../../Elements/Notification'
import { checkFavoriteMovies } from '@/utils/checkFavoriteMovies'

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
    const navigate = useNavigate()

    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [isFetching] = useAtom(isFetchingAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom)

    const [isSubmit, setIsSubmit] = useState(false)
    const [notifMessage, setNotifMessage] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [movieTypeState, setMovieTypeState] = useState(null)

    const handleAddFavoriteMovie = async () => {
        if (!emailStorage && !tokenStorage) return;
        try {
            const addMovie = await apiInstanceExpress.post('my-movies', {
                email: emailStorage,
                token: tokenStorage,
                data //data dikiri ini diambil dari props MovieCard diatas, baris kode 12 
            })

            if (addMovie.status !== 201) return setNotifMessage(`Film ${data.title} Gagal DiTambahkan Ke Favorite Movie Anda.`)
            setIsFavorited(true)

            setIsSubmit(true)
            setNotifMessage(`Film ${data.title} Berhasil Ditambahkan`)
            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        } catch (error) {
            setNotifMessage(`Sorry, ${error.message}`)

            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        }
    }

    const handleRemoveFavoriteMovie = async () => {
        if (!emailStorage && !tokenStorage) return;
        try {
            setIsSubmit(true)
            const removeMovie = await apiInstanceExpress.delete('my-movies', {
                data: {
                    email: emailStorage,
                    token: tokenStorage,
                    movieID: data.id //'data' didapat dari props yang dilempar oleh komponen pembungkusnya (EachUtils)

                }
            })
            if (removeMovie.status !== 204 && removeMovie.status !== 200) {
                return setNotifMessage(`Film ${data.title} gagal dihapus`)
            }
            setNotifMessage(`Film  ${data.title} berhasil dihapus!`)
            setIsFavorited(false)

            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
                setIsFavorited(false)
            }, 3000)
        } catch (error) {
            setNotifMessage(`Sorry, ${error.message}`)
            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        }
    }

    if (isFetching) return <Skeleton />

    return (
        <>
            {isSubmit && notifMessage && <Notification message={notifMessage} />}
            {isHover && idMovie === data.id && moviesType === movieTypeState ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0, ease: "easeInOut" }}
                    className='relative shadow-md transition-all w-full overflow-hidden rounded-md bg-black'
                >
                    <div className="w-full h-[180px] flex justify-center items-center overflow-hidden bg-black hover:scale-110 transition-all">
                        <ReactPlayer
                            src={`https://youtube.com/watch?v=${videoUrl}`}
                            playing={true}
                            loop={true}
                            muted={true}
                            width="320px"
                            height="100%"
                            controls={false}
                        />
                    </div>
                    <div className='h-auto p-4 bg-[#141414] flex flex-col gap-1.5 rounded-b-xl'>
                        <section className='mt-1 flex justify-between'>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => navigate("/watch/" + videoUrl)}
                                    className='text-slate-300 cursor-pointer hover:text-white transition-all'
                                >
                                    <GoPlay size={32} />
                                </button>
                                <button
                                    className='text-slate-300 cursor-pointer hover:text-white transition-all'
                                    onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                >
                                    {isFavorited ? <GoTrash size={32} /> : <GoPlusCircle size={32} />}
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className='rounded-full p-1 border cursor-pointer'
                                >
                                    <GoChevronDown size={20} />
                                </button>
                            </div>
                        </section>
                        <section className='text-left'>
                            <h2 className='font-semibold'>{data.title}</h2>
                            <p className='text-green-400'>Popularity: {data.popularity}</p>
                        </section>
                    </div>
                </motion.div>
            ) :
                <img
                    onMouseEnter={() => {
                        setIsHover(true)
                        setIdMovie(data.id)
                        getVideoUrl({ movie_id: data.id }).then(result => setVideoUrl(result))
                        checkFavoriteMovies({ emailStorage, tokenStorage, idMovie: data.id }).then(result => setIsFavorited(result))
                        setMovieTypeState(moviesType)
                    }}
                    src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
                    className='w-full max-h-72 cursor-pointer object-cover rounded-xl' />
            }
        </>
    )
}

export default MovieCard
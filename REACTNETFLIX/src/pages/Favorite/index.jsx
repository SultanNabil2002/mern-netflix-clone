import React, { useEffect, useState } from 'react'
import BrowseLayout from '@/components/Layouts/BrowseLayout'
import MovieCard from '@/components/modules/BrowsePage/MovieCard'
import EachUtils from '@/utils/EachUtils'

import { LIST_VIDEO_RECOMMENDATION } from '@/constants/dummyVideo'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, tokenAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import { apiInstanceExpress } from '@/utils/apiInstance'
import Modal from '@/components/modules/BrowsePage/Modal'

const Favorite = () => {
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [isFavorited] = useAtom(isFavoritedAtom)

    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    const getFavoriteMovies = async () => {
        try {
            const url = `my-movies/${emailStorage}/${tokenStorage}`
            const movies = await apiInstanceExpress.get(url)
            if (movies.status === 200) return movies.data
        } catch (error) {
            console.error(error);
            return error.message
        }
    }

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getFavoriteMovies().then(result => setMovieList(result.data.favoriteMovies));
        }
    }, [emailStorage, tokenStorage, isFavorited])

    return (
        <BrowseLayout>
            <div className='mt-20 px-8'>
                <h3 className='text-white font-bold text-xl text-2xl'>My Favorite Movies</h3>
                {movieList.length === 0 && <p>Belum Ada Film Favorite Saat Ini..</p>}
            </div>
            <div className='grid sm:grid-cols-4 grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-8 py-8'>
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div key={index}>
                            <div
                                className='h-72'
                                key={index}
                                onMouseLeave={() => {
                                    setIsHover(false)
                                    setIdMovie(null)
                                }}
                            >
                                <MovieCard
                                    data={item}
                                    isHover={isHover}
                                    setIsHover={setIsHover}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
            <Modal />
        </BrowseLayout>
    )
}

export default Favorite
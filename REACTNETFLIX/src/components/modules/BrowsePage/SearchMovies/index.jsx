import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { searchMovies } from '@/utils/searchMovies'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'

const SearchMovies = () => {
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [searchQuery] = useAtom(searchMoviesAtom)
    const [, setIsFetching] = useAtom(isFetchingAtom)

    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        if (searchQuery) {
            searchMovies({ query: searchQuery }).then(result => {
                setIsFetching(true)
                setMovieList(result)
            }).finally(() => {
                setTimeout(() => {
                    setIsFetching(false)
                }, 500)
            })
        }
    }, [searchQuery])

    return (
        <div className='grid grid-cols-4 p-8 mt-10 gap-4'>
            <EachUtils
                of={movieList}
                render={(item, index) => (
                    <div
                        className='h-72 mt-4'
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
                )}
            />
        </div>
    )
}

export default SearchMovies
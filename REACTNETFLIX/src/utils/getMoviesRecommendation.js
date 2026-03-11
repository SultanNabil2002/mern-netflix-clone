import { apiInstance } from "./apiInstance";

export const getMoviesRecommendations = async ({ movie_id }) => {
    try {
        const movies = await apiInstance("movie/" + movie_id + "/recommendations")
        return movies.data.results
    } catch (error) {
        console.log(error)
    }
}
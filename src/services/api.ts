import axios from 'axios'

//Constants
import { baseUrl } from '@/utils/constants/tmdb_api'

//Types
import type {
	ICredits,
	IError,
	IMovieDetail,
	IMoviesDiscover,
	ISeriesDetail,
	ISeriesDiscover,
	ITrailers,
	ITrending,
	ITrendingResult,
} from './types'

const apiKey = import.meta.env.VITE_API_KEY

//TRENDING
export const fetchTrending = async (
	time: string = 'week'
): Promise<ITrendingResult[] | IError> => {
	try {
		const res = await axios.get<ITrending>(
			`${baseUrl}/trending/all/${time}?api_key=${apiKey}`
		)
		return res.data.results
	} catch (error) {
		console.log(`[FETCH TRENDING ERROR]: ${error}`)
		return { Error: `[FETCH TRENDING ERROR]: ${error}` }
	}
}

//MOVIES AND SERIES - Details
export const fetchDetails = async ({
	type,
	id,
}: {
	type: string
	id: string
}): Promise<IMovieDetail | ISeriesDetail | IError> => {
	try {
		const res = await axios.get<IMovieDetail | ISeriesDetail>(
			`${baseUrl}/${type}/${id}?api_key=${apiKey}`
		)
		return res.data
	} catch (error) {
		console.log(`[FETCH TRENDING ERROR]: ${error}`)
		return { Error: `[FETCH TRENDING ERROR]: ${error}` }
	}
}

//MOVIES AND SERIES - CREDITS
export const fetchCredits = async ({
	type,
	id,
}: {
	type: string
	id: string
}): Promise<ICredits | IError> => {
	try {
		const res = await axios.get<ICredits>(
			`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
		)
		return res.data
	} catch (error) {
		console.log(`[FETCH CREDITS ERROR]: ${error}`)
		return { Error: `[FETCH CREDITS ERROR]: ${error}` }
	}
}

//MOVIES AND SERIES - TRAILERS
export const fetchTrailers = async ({
	type,
	id,
}: {
	type: string
	id: string
}): Promise<ITrailers | IError> => {
	try {
		const res = await axios.get<ITrailers>(
			`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
		)
		return res.data
	} catch (error) {
		console.log(`[FETCH VIDEOS ERROR]: ${error}`)
		return { Error: `[FETCH VIDEOS ERROR]: ${error}` }
	}
}

//MOVIES DISCOVER

export const fetchMoviesDiscovers = async (
	page: number = 1,
	sortBy:
		| 'popularity.desc'
		| 'vote_average.desc&vote_count.gte=1000' = 'popularity.desc'
): Promise<IMoviesDiscover | IError> => {
	try {
		const res = await axios.get<IMoviesDiscover | IError>(
			`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
		)
		return res.data
	} catch (error) {
		console.log(`[FETCH MOVIES DISCOVER ERROR]: ${error}`)
		return { Error: `[FETCH MOVIES DISCOVER ERROR]: ${error}` }
	}
}

//SERIES DISCOVER

export const fetchSeriesDiscovers = async (
	page: number = 1
): Promise<ISeriesDiscover | IError> => {
	try {
		const res = await axios.get<ISeriesDiscover | IError>(
			`${baseUrl}/discover/tv&page=${page}?api_key=${apiKey}`
		)
		return res.data
	} catch (error) {
		console.log(`[FETCH SERIES DISCOVER ERROR]: ${error}`)
		return { Error: `[FETCH SERIES DISCOVER ERROR]: ${error}` }
	}
}

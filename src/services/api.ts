import axios from 'axios'

//Constants
import { baseUrl } from '@/utils/constants/tmdb_api'

//Types
import type {
	ICredits,
	IError,
	IMovieDetail,
	ISeriesDetail,
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

//CREDITS
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

import axios from 'axios'

//Types
import { ITrending, ITrendingError, ITrendingResult } from './types'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_API_KEY

//TRENDING
export const fetchTrending = async (
	time: string = 'week'
): Promise<ITrendingResult[] | ITrendingError> => {
	try {
		const res = await axios.get<ITrending>(
			`${baseUrl}/trending/all/${time}?api_key=${apiKey}`
		)
		return res.data.results
	} catch (error) {
		return { Error: `[FETCH TRENDING ERROR]: ${error}` }
	}
}

import axios from 'axios'

//Constants
import { baseUrl } from '@/utils/constants/api'

//Types
import { ITrending, ITrendingError, ITrendingResult } from './types'

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
		console.log(`[FETCH TRENDING ERROR]: ${error}`)
		return { Error: `[FETCH TRENDING ERROR]: ${error}` }
	}
}

import axios from 'axios'
import { ITrending } from './types'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_API_KEY

//TRENDING
export const fetchTrending = async (
	time: string = 'week'
): Promise<ITrending> => {
	const res = await axios.get<ITrending>(
		`${baseUrl}/trending/all/${time}?api_key=${apiKey}`
	)

	return res.data
}

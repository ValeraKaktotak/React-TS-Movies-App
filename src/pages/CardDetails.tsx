import { fetchDetails } from '@/services/api'
import { IError, IMovieDetail, ISeriesDetail } from '@/services/types'
import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'

export const CardDetails: FC = () => {
	const { type, id } = useParams()
	const [data, setData] = useState<
		IMovieDetail | ISeriesDetail | IError | null
	>(null)

	console.log(data)

	useEffect(() => {
		const fetchDetailsData = async () => {
			if (type && id) {
				const res = await fetchDetails({ type, id })
				setData(res)
			}
		}
		fetchDetailsData()
	}, [id, type])

	return <div>CardDetails</div>
}

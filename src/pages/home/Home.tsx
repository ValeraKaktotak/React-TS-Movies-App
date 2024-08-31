import { Container, Heading } from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

//Services
import { fetchTrending } from '@/services/api'

//Types
import type { ITrendingError, ITrendingResult } from '@/services/types'

export const Home: FC = () => {
	const [data, setData] = useState<ITrendingResult[] | ITrendingError | null>(
		null
	)
	console.log(data)

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchTrending()
			setData(data)
		}

		fetchData()
	}, [])
	return (
		<Container maxW={'container.xl'}>
			<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
				Trending
			</Heading>
		</Container>
	)
}

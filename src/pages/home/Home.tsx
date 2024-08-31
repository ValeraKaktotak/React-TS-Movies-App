import { fetchTrending } from '@/services/api'
import { Container, Heading } from '@chakra-ui/react'
import { useEffect, type FC } from 'react'

export const Home: FC = () => {
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchTrending()
			console.log(data)
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

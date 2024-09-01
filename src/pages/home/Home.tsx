import { Container, Grid, Heading, Image } from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

//Services
import { fetchTrending } from '@/services/api'

//Constants
import { imgPath } from '@/utils/constants/api'

//Types
import type { ITrendingError, ITrendingResult } from '@/services/types'

export const Home: FC = () => {
	const [data, setData] = useState<ITrendingResult[] | ITrendingError | null>(
		null
	)

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetchTrending()
			setData(res)
		}

		fetchData()
	}, [])
	console.log(data)

	return (
		<Container maxW={'container.xl'}>
			<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
				Trending
			</Heading>
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					sm: 'repeat(3, 1fr)',
					md: 'repeat(5, 1fr)',
				}}
				gap={'2'}
			>
				{Array.isArray(data) ? (
					data.map(item => (
						<Image key={item.id} src={`${imgPath}${item.poster_path}`}></Image>
					))
				) : (
					<div>{data?.Error || 'Произошла ошибка'}</div>
				)}
			</Grid>
		</Container>
	)
}

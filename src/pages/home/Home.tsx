import { Box, Container, Flex, Grid, Heading, Skeleton } from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

//Services
import { fetchTrending } from '@/services/api'

//Types
import type { IError, ITrendingResult } from '@/services/types'

//Components
import { Card } from '@/components/Card'

export const Home: FC = () => {
	const [data, setData] = useState<ITrendingResult[] | IError | null>(null)
	const [time, setTime] = useState<'day' | 'week'>('day')
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const res = await fetchTrending(time)
			setData(res)
			setLoading(false)
		}

		fetchData()
	}, [time])

	return (
		<Container maxW={'container.xl'}>
			<Flex alignItems={'baseline'} gap={'4'} my={'10'}>
				<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
					Trending
				</Heading>
				<Flex
					alignItems={'center'}
					gap={'2'}
					border={'1px solid teal'}
					borderRadius={'20px'}
				>
					<Box
						as='button'
						px={'3'}
						py={'1'}
						borderRadius={'20px'}
						bg={`${time === 'day' ? 'gray.900' : ''}`}
						onClick={() => {
							setTime('day')
						}}
					>
						Today
					</Box>
					<Box
						as='button'
						px={'3'}
						py={'1'}
						borderRadius={'20px'}
						bg={`${time === 'week' ? 'gray.900' : ''}`}
						onClick={() => {
							setTime('week')
						}}
					>
						This week
					</Box>
				</Flex>
			</Flex>
			<Grid
				templateColumns={{
					base: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(5, 1fr)',
				}}
				gap={'4'}
			>
				{Array.isArray(data) ? (
					data.map((item, i) =>
						loading ? (
							<Skeleton key={i} height={'300px'} />
						) : (
							<Card key={item.id} cardData={item} type={item.media_type} />
						)
					)
				) : (
					<div>{data?.Error && 'Произошла ошибка'}</div>
				)}
			</Grid>
		</Container>
	)
}

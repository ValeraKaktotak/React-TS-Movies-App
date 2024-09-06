// import { Container, Heading } from '@chakra-ui/react'
// import type { FC } from 'react'

// export const Shows: FC = () => {
// 	return (
// 		<Container maxW={'container.xl'}>
// 			<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
// 				Discover TV Shows
// 			</Heading>
// 		</Container>
// 	)
// }

import {
	Box,
	Container,
	Flex,
	Grid,
	Heading,
	Select,
	Skeleton,
} from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

// API
import { fetchSeriesDiscovers } from '@/services/api'

// Types
import Card from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import type { IError, ISeriesDiscover, ITrendingResult } from '@/services/types'

export const Shows: FC = () => {
	const [shows, setShows] = useState<ISeriesDiscover | IError | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [sortBy, setSortBy] = useState<
		'popularity.desc' | 'vote_average.desc&vote_count.gte=1000'
	>('popularity.desc')
	const totalPages = 500

	const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortByValue = e.target.value
		setCurrentPage(1)
		setSortBy(
			sortByValue as 'popularity.desc' | 'vote_average.desc&vote_count.gte=1000'
		)
	}

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const res = await fetchSeriesDiscovers(currentPage, sortBy)
			setShows(res)
			if ('page' in res) {
				setCurrentPage(res.page)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [currentPage, sortBy])

	if (shows && 'Error' in shows) {
		//TODO need error component
		return <Box>{shows.Error}</Box>
	}

	return (
		<Container maxW={'container.xl'}>
			<Flex alignItems={'baseline'} gap={4} my={10}>
				<Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
					Discover TV Shows
				</Heading>

				<Select w={'130px'} onChange={onChangeHandler}>
					<option value={'popularity.desc'}>Popular</option>
					<option value={'vote_average.desc&vote_count.gte=1000'}>
						Top Rated
					</option>
				</Select>
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
				{shows &&
					shows.results?.map((item, i) =>
						isLoading ? (
							<Skeleton height={300} key={i} />
						) : (
							<Card
								key={item?.id}
								cardData={item as ITrendingResult}
								type={'tv'}
							/>
						)
					)}
			</Grid>

			{/* Pagination */}
			<Pagination
				activePage={currentPage}
				totalPages={totalPages}
				setActivePage={setCurrentPage}
			/>
		</Container>
	)
}

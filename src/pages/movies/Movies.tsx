import { Box, Container, Grid, Heading, Skeleton } from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

// API
import { fetchMoviesDiscovers } from '@/services/api'

// Types
import Card from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import type { IError, IMoviesDiscover, ITrendingResult } from '@/services/types'

export const Movies: FC = () => {
	const [movies, setMovies] = useState<IMoviesDiscover | IError | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)

	console.log(movies)
	console.log(isLoading)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const res = await fetchMoviesDiscovers(currentPage)
			setMovies(res)
			if ('page' in res) {
				setCurrentPage(res.page)
				setTotalPages(res.total_pages)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [currentPage])

	if (movies && 'Error' in movies) {
		//TODO need error component
		return <Box>{movies.Error}</Box>
	}

	return (
		<Container maxW={'container.xl'}>
			<Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
				Discover Movies
			</Heading>

			<Grid
				templateColumns={{
					base: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(5, 1fr)',
				}}
				gap={'4'}
			>
				{movies &&
					movies.results?.map((item, i) =>
						isLoading ? (
							<Skeleton height={300} key={i} />
						) : (
							<Card
								key={item?.id}
								cardData={item as ITrendingResult}
								type={'movie'}
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

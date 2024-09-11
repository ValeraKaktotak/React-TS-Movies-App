import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Input,
	Skeleton,
	Spinner,
} from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'

//API
import { fetchSearch } from '@/services/api'

//Types
import type { IError, ISearch, ITrendingResult } from '@/services/types'

//Components
import { Card } from '@/components/Card'
import { Pagination } from '@/components/Pagination'

export const Search: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [tempSearchValue, setTempSearchValue] = useState<string>('')
	const [activePage, setActivePage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)
	const [isAdult] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [searchData, setSearchData] = useState<ISearch | IError | null>(null)

	const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currentValue = e.currentTarget.value
		setTempSearchValue(currentValue)
	}

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearchValue(tempSearchValue)
	}

	useEffect(() => {
		const handleFetch = async () => {
			setIsLoading(true)
			const res = await fetchSearch(searchValue, activePage, isAdult)
			setSearchData(res)
			if ('page' in res) {
				setActivePage(res.page)
				setTotalPages(res.total_pages)
			}
			setIsLoading(false)
		}
		handleFetch()
	}, [searchValue, activePage, isAdult])

	if (searchData && 'Error' in searchData) {
		//TODO need error component
		return <Box>{searchData.Error}</Box>
	}

	return (
		<Container maxW={'container.xl'}>
			<Flex alignItems={'baseline'} gap={'4'} my={'10'}>
				<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
					Search Page
				</Heading>
			</Flex>

			<form onSubmit={handleSearch}>
				<Flex gap={10} wrap={'wrap'}>
					<Input
						maxW={'450px'}
						placeholder='Search ...'
						_placeholder={{ color: 'gray.100' }}
						value={tempSearchValue}
						onChange={changeInputHandle}
					/>
					<Button type={'submit'} colorScheme='grey' variant={'outline'}>
						Let's search
					</Button>
				</Flex>
			</form>

			{isLoading && (
				<Flex justifyContent={'center'} mt={10}>
					<Spinner size={'xl'} color='red' />
				</Flex>
			)}

			{searchData?.results.length === 0 && !isLoading && (
				<Heading textAlign={'center'} as={'h3'} fontSize={'sm'} mt={10}>
					No results found
				</Heading>
			)}

			<Grid
				templateColumns={{
					base: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(5, 1fr)',
				}}
				gap={'4'}
				mt={10}
			>
				{searchData &&
					searchData.results?.map((item, i) =>
						isLoading ? (
							<Skeleton height={300} key={i} />
						) : (
							<Card
								key={item?.id}
								cardData={item as ITrendingResult}
								type={item?.media_type}
							/>
						)
					)}
			</Grid>

			{searchData && searchData.total_pages > 1 && (
				<Pagination
					activePage={activePage}
					setActivePage={setActivePage}
					totalPages={totalPages}
				/>
			)}
		</Container>
	)
}

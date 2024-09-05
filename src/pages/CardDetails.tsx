import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from '@chakra-ui/icons'
import {
	Badge,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Container,
	Flex,
	Heading,
	Image,
	Spinner,
	Text,
} from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'

//Services API
import { fetchCredits, fetchDetails, fetchTrailers } from '@/services/api'

//Helpers
import { resolveRatingColor } from '@/utils/helpers/ratingColor'
import { ratingToPercentage } from '@/utils/helpers/ratingToPercentage'

//Constants
import { imgPath } from '@/utils/constants/tmdb_api'

//Types
import type {
	ICredits,
	IError,
	IMovieDetail,
	ISeriesDetail,
	ITrailers,
} from '@/services/types'

//Components
import { VideoComponent } from '@/components/VideoComponent'

export const CardDetails: FC = () => {
	const { type, id } = useParams()

	const [detailsData, setDetailsData] = useState<
		IMovieDetail | ISeriesDetail | IError | null
	>(null)
	const [creditsData, setCreditsData] = useState<ICredits | IError | null>(null)
	const [trailersData, setTrailersData] = useState<ITrailers | IError | null>(
		null
	)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			if (type && id) {
				const detailsResponse = await fetchDetails({ type, id })
				const creditsResponse = await fetchCredits({ type, id })
				const trailersResponse = await fetchTrailers({ type, id })
				setDetailsData(detailsResponse)
				setCreditsData(creditsResponse)
				setTrailersData(trailersResponse)
			}
			setLoading(false)
		}
		fetchData()
	}, [id, type])

	if (loading) {
		return (
			<Flex justify={'center'}>
				<Spinner size={'xl'} color='red' />
			</Flex>
		)
	}
	if (detailsData && 'Error' in detailsData) {
		//TODO need error component
		return <Box>{detailsData.Error}</Box>
	}
	if (creditsData && 'Error' in creditsData) {
		//TODO need error component
		return <Box>{creditsData.Error}</Box>
	}
	if (trailersData && 'Error' in trailersData) {
		//TODO need error component
		return <Box>{trailersData.Error}</Box>
	}

	const title = detailsData
		? 'name' in detailsData
			? detailsData.name
			: (detailsData as IMovieDetail).title
		: 'N/A'

	const releaseDate = detailsData
		? 'episode_run_time' in detailsData
			? detailsData.first_air_date
			: (detailsData as IMovieDetail).release_date
		: 'N/A'

	const videoTrailer = trailersData
		? trailersData.results?.find(item => item.type === 'Trailer')
		: null

	const videos = trailersData
		? trailersData.results
				?.filter(video => video.type !== 'trailer')
				?.slice(0, 10)
		: []

	return (
		<Box>
			<Box
				background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imgPath}/${detailsData?.backdrop_path})`}
				backgroundRepeat={'no-repeat'}
				backgroundSize={'cover'}
				backgroundPosition={'center'}
				w={'100%'}
				h={{ base: 'auto', md: '500px' }}
				py={2}
				display={'flex'}
				alignItems={'center'}
			>
				<Container maxWidth={'container.xl'}>
					<Flex
						alignItems={'center'}
						gap={10}
						flexDirection={{ base: 'column', md: 'row' }}
					>
						<Image
							height={'450px'}
							borderRadius={'sm'}
							src={`${imgPath}/${detailsData?.poster_path}`}
						/>
						<Box>
							<Heading fontSize={'3xl'}>
								{title + ' '}
								<Text as={'span'} fontWeight={'normal'} color={'gray.400'}>
									{isNaN(new Date(releaseDate).getFullYear())
										? 'N/A'
										: new Date(releaseDate).getFullYear()}
								</Text>
							</Heading>
							<Flex alignItems={'center'} gap={4} mt={1} mb={5}>
								<Flex alignItems={'center'}>
									<CalendarIcon mr={2} color={'gray.400'} />
									<Text fontSize={'sm'}>
										{new Date(releaseDate).toLocaleDateString('en-US')} (US)
									</Text>
								</Flex>
							</Flex>
							<Flex alignItems={'center'} gap={4}>
								<CircularProgress
									value={Number(
										ratingToPercentage(Number(detailsData?.vote_average))
									)}
									bg={'gray.800'}
									borderRadius={'full'}
									p={0.5}
									size={'70px'}
									color={resolveRatingColor(Number(detailsData?.vote_average))}
									thickness={'6px'}
								>
									<CircularProgressLabel fontSize={'lg'}>
										{ratingToPercentage(Number(detailsData?.vote_average))} %
									</CircularProgressLabel>
								</CircularProgress>
								<Text display={{ base: 'none', md: 'initial' }}>
									User Score
								</Text>
								<Button
									display={'none'}
									leftIcon={<CheckCircleIcon />}
									colorScheme='green'
									variant={'outline'}
									onClick={() => console.log('add in watchlist')}
								>
									In watchlist
								</Button>
								<Button
									leftIcon={<SmallAddIcon />}
									variant={'outline'}
									onClick={() => console.log('add in watchlist')}
								>
									Add to watchlist
								</Button>
							</Flex>
							<Text
								color={'gray.400'}
								fontStyle={'italic'}
								fontSize={'sm'}
								my={5}
							>
								{detailsData?.tagline}
							</Text>
							<Heading fontSize={'xl'} mb={3}>
								Overview
							</Heading>
							<Text fontSize={'medium'} mb={3}>
								{detailsData?.overview}
							</Text>
							<Flex mt={6} gap={2}>
								{detailsData?.genres?.map(genre => (
									<Badge key={genre.id} p={1}>
										{genre.name}
									</Badge>
								))}
							</Flex>
						</Box>
					</Flex>
				</Container>
			</Box>

			<Container maxW={'container.xl'} pb={10}>
				<Heading as='h2' fontSize={'md'} textTransform={'uppercase'} mt='10'>
					Cast
				</Heading>
				<Flex mt='5' mb='10' overflowX={'scroll'} gap={'5'}>
					{creditsData && creditsData.cast?.length === 0 && (
						<Text>No cast found</Text>
					)}
					{creditsData &&
						creditsData.cast?.map(item => (
							<Box key={item?.id} minW={'150px'}>
								<Image
									src={`${imgPath}/${item?.profile_path}`}
									w={'100%'}
									height={'225px'}
									objectFit={'cover'}
									borderRadius={'sm'}
								/>
							</Box>
						))}
				</Flex>

				<Heading
					as='h2'
					fontSize={'md'}
					textTransform={'uppercase'}
					mt='10'
					mb='5'
				>
					Videos
				</Heading>

				<VideoComponent id={videoTrailer?.key || 'N/F'} />
			</Container>
		</Box>
	)
}

import { CheckIcon, StarIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	Heading,
	IconButton,
	Image,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { useContext, type FC } from 'react'
import { Link } from 'react-router-dom'

//Types
import { IWatchlistItem } from '@/services/types'

//Context
import { userAuthContext } from '@/context/AuthContext'

//Constants
import { useFirestore } from '@/services/firestore'
import { imgPath } from '@/utils/constants/tmdb_api'

interface IWatchlistCard {
	item: IWatchlistItem
	type: IWatchlistItem['type']
	setWatchlistItem: (data: (prev: IWatchlistItem[]) => IWatchlistItem[]) => void
}

export const WatchlistCard: FC<IWatchlistCard> = ({
	item,
	type,
	setWatchlistItem,
}) => {
	const { user } = useContext(userAuthContext)
	const { removeFromWatchlist } = useFirestore()

	const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault() // Prevent the default behavior (link redirection)
		if (user) {
			removeFromWatchlist(user?.uid, item.id).then(() => {
				setWatchlistItem((prev: IWatchlistItem[]) =>
					prev.filter(el => el.id !== item.id)
				)
			})
		}
	}

	return (
		<Link to={`/${type}/${item.id}`}>
			<Flex gap='4'>
				<Box position={'relative'} w={'150px'}>
					<Image
						src={`${imgPath}/${item.poster_path}`}
						alt={item.title}
						height={'200px'}
						minW={'150px'}
						objectFit={'cover'}
					/>
					<Tooltip label='Remove from watchlist'>
						<IconButton
							aria-label='Remove from watchlist'
							icon={<CheckIcon />}
							size={'sm'}
							colorScheme='yellow'
							position={'absolute'}
							zIndex={'999'}
							top='2px'
							left={'2px'}
							onClick={handleRemoveClick}
						/>
					</Tooltip>
				</Box>

				<Box>
					<Heading fontSize={{ base: 'xl', md: '2xl' }} noOfLines={1}>
						{item?.title}
					</Heading>
					<Heading fontSize={'sm'} color={'green.200'} mt='2'>
						{new Date(item?.release_date).getFullYear() || 'N/A'}
					</Heading>
					<Flex alignItems={'center'} gap={2} mt='4'>
						<StarIcon fontSize={'small'} />
						<Text textAlign={'center'} fontSize='small'>
							{item?.vote_average?.toFixed(1)}
						</Text>
					</Flex>
					<Text mt='4' fontSize={{ base: 'xs', md: 'sm' }} noOfLines={5}>
						{item?.overview}
					</Text>
				</Box>
			</Flex>
		</Link>
	)
}

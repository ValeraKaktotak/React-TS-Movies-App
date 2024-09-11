import { Container, Flex, Grid, Heading, Spinner } from '@chakra-ui/react'
import { useContext, useEffect, useState, type FC } from 'react'

//Context
import { userAuthContext } from '@/context/AuthContext'

//Services
import { useFirestore } from '@/services/firestore'

//Types
import type { IWatchlistItem } from '@/services/types'

//Component
import { WatchlistCard } from '@/components/WatchlistCard'

export const WatchList: FC = () => {
	const { user } = useContext(userAuthContext)
	const { getWatchlist } = useFirestore()
	const [watchlistItem, setWatchlistItem] = useState<IWatchlistItem[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (user?.uid) {
			getWatchlist(user.uid)
				.then(res => setWatchlistItem(res))
				.catch(err => console.log(err))
				.finally(() => {
					setIsLoading(false)
				})
		}
	}, [user, getWatchlist])

	return (
		<Container maxW={'container.xl'}>
			<Flex alignItems={'baseline'} gap={'4'} my={'10'}>
				<Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
					Watchlist
				</Heading>
			</Flex>
			{isLoading && (
				<Flex justify={'center'} mt='10'>
					<Spinner size={'xl'} color='red' />
				</Flex>
			)}
			{!isLoading && watchlistItem?.length === 0 && (
				<Flex justify={'center'} mt='10'>
					<Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
						Watchlist is empty
					</Heading>
				</Flex>
			)}
			{!isLoading && watchlistItem?.length > 0 && (
				<Grid
					templateColumns={{
						base: '1fr',
					}}
					gap={'4'}
				>
					{watchlistItem?.map(item => (
						<WatchlistCard
							key={item?.id}
							item={item}
							type={item?.type}
							setWatchlistItem={setWatchlistItem}
						/>
					))}
				</Grid>
			)}
		</Container>
	)
}

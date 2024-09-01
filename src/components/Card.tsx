import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

//Constants
import { imgPath } from '@/utils/constants/api'

//Types
import type { ITrendingResult } from '@/services/types'

interface ICard {
	cardData: ITrendingResult
}

const Card: FC<ICard> = ({ cardData }) => {
	return (
		<Link to='#'>
			<Box
				position={'relative'}
				transform={'scale(1)'}
				transition={'transform 0.2s ease-in-out'}
				_hover={{
					transform: { base: 'scale(1)', sm: 'scale(1.08)' },
					'& .overlay': { opacity: 1 },
				}}
			>
				<Image
					src={`${imgPath}${cardData.poster_path}`}
					alt={cardData.title || cardData.name}
				/>
				<Box
					transition={'opacity 0.3s ease-in-out'}
					className='overlay'
					position={'absolute'}
					p='2'
					bottom={'0'}
					left={'0'}
					w={'100%'}
					h={'33%'}
					bg={'rgba(0,0,0,0.9)'}
					opacity={'0'}
				>
					<Flex
						flexDirection={'column'}
						justifyContent={'space-between'}
						height={'100%'}
					>
						<Text textAlign={'center'}>{cardData.title || cardData.name}</Text>
						<Text textAlign={'center'} fontSize={'x-small'} color={'green.200'}>
							{cardData.release_date || cardData.first_air_date
								? new Date(
										cardData.release_date ?? cardData.first_air_date!
								  ).getFullYear()
								: 'N/A'}
						</Text>
						<Flex alignItems={'center'} justifyContent={'center'} gap={'2'}>
							<StarIcon fontSize={'small'} />
							<Text>{cardData.vote_average?.toFixed(1)}</Text>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</Link>
	)
}
export default Card

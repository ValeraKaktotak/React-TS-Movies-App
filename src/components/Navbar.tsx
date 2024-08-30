import { Box, Container, Flex } from '@chakra-ui/react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

export const Navbar: FC = () => {
	return (
		<Box py='4' mb='2'>
			<Container maxW={'container.xl'}>
				<Flex justifyContent={'space-between'}>
					<Link to='/'>
						<Box
							fontSize={'2xl'}
							fontWeight={'bold'}
							color={'red'}
							letterSpacing={'widest'}
							fontFamily={'mono'}
						>
							FILMS COLLECTION
						</Box>
					</Link>

					{/* DESKTOP */}
					<Flex>
						<Link to='/'>Home</Link>
						<Link to='/movies'>Movies</Link>
						<Link to='/shows'>TV Shows</Link>
						<Link to='/search'>Search</Link>
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}

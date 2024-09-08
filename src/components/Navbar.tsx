import { Box, Container, Flex } from '@chakra-ui/react'
import { useContext, type FC } from 'react'
import { Link } from 'react-router-dom'

//Context
import { userAuthContext } from '@/context/AuthContext'

export const Navbar: FC = () => {
	const { user } = useContext(userAuthContext)

	console.log(user)

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
							NOTFLEX
						</Box>
					</Link>

					{/* DESKTOP */}
					<Flex gap={'4'} alignItems={'center'}>
						<Link to='/'>Home</Link>
						<Link to='/movies'>Movies</Link>
						<Link to='/tv'>TV Shows</Link>
						<Link to='/search'>Search</Link>
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}

import {
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { useContext, type FC } from 'react'
import { Link } from 'react-router-dom'

//Context
import { userAuthContext } from '@/context/AuthContext'
import { SearchIcon } from '@chakra-ui/icons'
import { AuthForm } from './AuthForm'

export const Navbar: FC = () => {
	const { user, googleSignIn, logout } = useContext(userAuthContext)
	const { isOpen, onOpen, onClose } = useDisclosure()

	//Logout and close modal
	const handleLogout = () => {
		if (logout) {
			logout()
			onClose()
		}
	}

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
						<Link to='/search'>
							<SearchIcon fontSize={'xl'} />
						</Link>
						{user && (
							<Menu>
								<MenuButton>
									<Avatar
										bg={'red.500'}
										color={'white'}
										size={'sm'}
										name={user.email!}
									/>
								</MenuButton>
								<MenuList>
									<Link to='/watchlist'>
										<MenuItem>Watchlist</MenuItem>
									</Link>
									<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</MenuList>
							</Menu>
						)}
						{!user && (
							<>
								<Avatar
									bg={'gray.800'}
									color={'white'}
									size={'sm'}
									as={'button'}
									onClick={onOpen}
								/>

								<Modal isOpen={isOpen} onClose={onClose}>
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>Modal Title</ModalHeader>
										<ModalCloseButton />
										<ModalBody>
											<AuthForm onCloseProp={onClose} />
										</ModalBody>

										<ModalFooter flexDirection={'column'} gap={5}>
											<Button colorScheme='green' onClick={googleSignIn}>
												Enter with Google
											</Button>
											<Button colorScheme='blue' onClick={onClose}>
												Close
											</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
							</>
						)}
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}

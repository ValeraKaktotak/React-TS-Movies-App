import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	IconButton,
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

//Component
import { AuthForm } from './AuthForm'

export const Navbar: FC = () => {
	const { user, googleSignIn, logout } = useContext(userAuthContext)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen: isDrawerOpen,
		onOpen: onDrawerOpen,
		onClose: onDrawerClose,
	} = useDisclosure()

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
					<Flex
						gap={'4'}
						alignItems={'center'}
						display={{ base: 'none', sm: 'flex' }}
					>
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

					{/* Mobile */}
					<Flex
						display={{ base: 'flex', sm: 'none' }}
						alignItems={'center'}
						gap='4'
					>
						<Link to='/search'>
							<SearchIcon fontSize={'xl'} />
						</Link>
						<IconButton
							onClick={onDrawerOpen}
							aria-label='burger'
							icon={<HamburgerIcon />}
						/>
						<Drawer
							isOpen={isDrawerOpen}
							placement='right'
							onClose={onDrawerClose}
						>
							<DrawerOverlay />
							<DrawerContent bg={'black'}>
								<DrawerCloseButton />
								<DrawerHeader>
									{user ? (
										<Flex alignItems='center' gap='2'>
											<Avatar bg='red.500' size={'sm'} name={user.email!} />
											<Box fontSize={'sm'}>
												{user?.displayName || user?.email}
											</Box>
										</Flex>
									) : (
										<Avatar
											size={'sm'}
											bg='gray.800'
											as='button'
											onClick={onOpen}
										/>
									)}
								</DrawerHeader>

								<DrawerBody>
									<Flex
										flexDirection={'column'}
										gap={'4'}
										onClick={onDrawerClose}
									>
										<Link to='/'>Home</Link>
										<Link to='/movies'>Movies</Link>
										<Link to='/tv'>TV Shows</Link>
										{user && (
											<>
												<Link to='/watchlist'>Watchlist</Link>
												<Button
													variant={'outline'}
													colorScheme='red'
													onClick={handleLogout}
												>
													Logout
												</Button>
											</>
										)}
									</Flex>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}

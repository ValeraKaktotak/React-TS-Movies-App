import { userAuthContext } from '@/context/AuthContext'
import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { useContext, useState, type FC } from 'react'

interface UserSignIn {
	email: string
	password: string
	confirmPassword: string
}

interface IAuthForm {
	onCloseProp: () => void
}

const initialValue: UserSignIn = {
	email: '',
	password: '',
	confirmPassword: '',
}

export const AuthForm: FC<IAuthForm> = ({ onCloseProp }) => {
	const { logIn, signUp } = useContext(userAuthContext)
	const [userInfo, setUserInfo] = useState<UserSignIn>(initialValue)
	const [isSignIn, setSignIn] = useState<boolean>(false)
	const [isError, setIsError] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			if (logIn && isSignIn) {
				await logIn(userInfo.email, userInfo.password)
			} else if (signUp && !isSignIn) {
				if (userInfo.password !== userInfo.confirmPassword) {
					setIsError('Confirm the password')
					return false
				}
				if (userInfo.password.length < 6) {
					setIsError('Password must be at least 6 characters long')
					return false
				}
				setIsError('')
				signUp(userInfo.email, userInfo.password)
			}
			onCloseProp()
		} catch (error) {
			console.log(error)
			setIsError('Something wrong with credential')
		}
	}

	if (isSignIn) {
		return (
			<form onSubmit={handleSubmit}>
				<Box gridGap={2} mb={4}>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<Input
						isRequired
						id='email'
						type='email'
						value={userInfo.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUserInfo({ ...userInfo, email: e.target.value })
						}
						placeholder='m@example.com'
					/>
				</Box>
				<Box gridGap={2} mb={4}>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input
						isRequired
						id='password'
						type='password'
						placeholder='Password'
						value={userInfo.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUserInfo({ ...userInfo, password: e.target.value })
						}
					/>
				</Box>
				{isError && <Box color={'red'}>{isError}</Box>}

				<Flex justifyContent={'space-between'} mt={10}>
					<Button type='submit'>Sign In</Button>
					<Button onClick={() => setSignIn(false)}>Sign Up</Button>
				</Flex>
			</form>
		)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Box gridGap={2} mb={4}>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input
					isRequired
					id='email'
					type='email'
					value={userInfo.email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUserInfo({ ...userInfo, email: e.target.value })
					}
					placeholder='m@example.com'
				/>
			</Box>
			<Box gridGap={2} mb={4}>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input
					isRequired
					min={6}
					id='password'
					type='password'
					placeholder='Password'
					value={userInfo.password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUserInfo({ ...userInfo, password: e.target.value })
					}
				/>
			</Box>
			<Box gridGap={2} mb={4}>
				<FormLabel htmlFor='password'>Confirm password</FormLabel>
				<Input
					isRequired
					min={6}
					id='confirmpassword'
					type='password'
					placeholder='Confirm password'
					value={userInfo.confirmPassword}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUserInfo({
							...userInfo,
							confirmPassword: e.target.value,
						})
					}
				/>
			</Box>
			{isError && <Box color={'red'}>{isError}</Box>}

			<Flex justifyContent={'space-between'} mt={10}>
				<Button type='submit'>Sign Up</Button>
				<Button onClick={() => setSignIn(true)}>Sign In</Button>
			</Flex>
		</form>
	)
}

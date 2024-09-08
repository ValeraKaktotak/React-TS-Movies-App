import { User, UserCredential } from 'firebase/auth'
import { createContext } from 'react'

export type AuthContextData = {
	user: User | null
	isLoading?: boolean
	googleSignIn?: () => Promise<UserCredential>
	signUp?: (email: string, password: string) => Promise<UserCredential>
	logIn?: (email: string, password: string) => Promise<UserCredential>
	logout?: () => Promise<void>
}

export const userAuthContext = createContext<AuthContextData>({
	user: null,
})

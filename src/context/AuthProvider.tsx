import { useEffect, useState, type FC } from 'react'

//FB functions
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

//Types
import type { User, UserCredential } from 'firebase/auth'

//Services
import { auth } from '@/services/firebase'

//Context
import { userAuthContext } from '@/context/AuthContext'

interface IAuthProvider {
	children: React.ReactNode
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const googleSignIn = (): Promise<UserCredential> => {
		const googleAuthProvider = new GoogleAuthProvider()
		return signInWithPopup(auth, googleAuthProvider)
	}

	const signUp = (email: string, password: string): Promise<UserCredential> => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const logIn = (email: string, password: string): Promise<UserCredential> => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = (): Promise<void> => {
		return signOut(auth)
	}

	useEffect(() => {
		//add FB Auth listener
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setIsLoading(true)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<userAuthContext.Provider
			value={{ user, isLoading, googleSignIn, signUp, logIn, logout }}
		>
			{children}
		</userAuthContext.Provider>
	)
}

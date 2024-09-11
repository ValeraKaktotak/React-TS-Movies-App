import { useToast } from '@chakra-ui/react'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore'
import { useCallback } from 'react'

//Services
import { db } from './firebase'

//Types
import type { IAddDocument, IWatchlistItem } from './types'

export const useFirestore = () => {
	const toast = useToast()

	const addDocument = async (collectionName: string, data: IAddDocument) => {
		const docRef = await addDoc(collection(db, collectionName), data)
		console.log('Document written with ID: ', docRef.id)
	}

	const addToWatchlist = async (
		userId: string,
		dataId: string,
		data: IAddDocument
	) => {
		try {
			if (await checkIfInWatchlist(userId, dataId)) {
				toast({
					title: 'Error',
					description: 'This item is already in your watchlist',
					status: 'error',
					duration: 9000,
					isClosable: true,
				})
				return false
			}
			await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data)
			toast({
				title: 'Success!',
				description: 'Added to watchlist',
				status: 'success',
				isClosable: true,
			})
		} catch (error) {
			console.log(error, 'Error adding document')
			toast({
				title: 'Error',
				description: 'An error occurred',
				status: 'error',
				isClosable: true,
			})
		}
	}
	const checkIfInWatchlist = async (
		userId: string | number,
		dataId: string | number
	) => {
		const docRef = doc(
			db,
			'users',
			userId?.toString(),
			'watchlist',
			dataId?.toString()
		)

		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return true
		} else {
			return false
		}
	}

	const removeFromWatchlist = async (
		userId: string | number,
		dataId: string | number
	) => {
		try {
			await deleteDoc(
				doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString())
			)
			toast({
				title: 'Success!',
				description: 'Removed from watchlist',
				status: 'success',
				isClosable: true,
			})
		} catch (error) {
			toast({
				title: 'Error!',
				description: 'An error occurred.',
				status: 'error',
				isClosable: true,
			})
			console.log(error, 'Error while deleting doc')
		}
	}

	const getWatchlist = useCallback(
		async (userId: string | number): Promise<IWatchlistItem[]> => {
			const querySnapshot = await getDocs(
				collection(db, 'users', userId.toString(), 'watchlist')
			)
			const data: IWatchlistItem[] = querySnapshot.docs.map(doc => ({
				...(doc.data() as IWatchlistItem),
			}))
			return data
		},
		[]
	)

	return {
		addDocument,
		addToWatchlist,
		removeFromWatchlist,
		checkIfInWatchlist,
		getWatchlist,
	}
}

import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

//Services
import { useToast } from '@chakra-ui/react'
import { db } from './firebase'

interface IAddDocument {
	id: number
	title: string
	type: string
	poster_path: string
	release_date: string
	vote_average: number
	overview: string
}

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

	return {
		addDocument,
		addToWatchlist,
		checkIfInWatchlist,
	}
}

import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

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

	return {
		addDocument,
		addToWatchlist,
	}
}

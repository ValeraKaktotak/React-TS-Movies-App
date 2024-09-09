import { useContext, type FC } from 'react'

//Context
import { userAuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

interface IProtectedRoute {
	children: React.ReactNode
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
	const { user, isLoading } = useContext(userAuthContext)

	//TODO loading component
	if (isLoading) {
		return <div>Loading...</div>
	}

	return <>{user ? children : <Navigate to='/' />}</>
}

import { createBrowserRouter } from 'react-router-dom'

//Components
import App from '@/App'
import { CardDetails } from '@/pages/CardDetails'
import { Home } from '@/pages/home/Home'
import { Movies } from '@/pages/movies/Movies'
import { Search } from '@/pages/search/Search'
import { Shows } from '@/pages/shows/Shows'
import { WatchList } from '@/pages/WatchList'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: '/movies',
				element: <Movies />,
			},
			{
				path: '/tv',
				element: <Shows />,
			},
			{
				path: '/search',
				element: <Search />,
			},
			{
				path: '/watchList',
				element: (
					<ProtectedRoute>
						<WatchList />
					</ProtectedRoute>
				),
			},
			{
				path: '/:type/:id',
				element: <CardDetails />,
			},
		],
	},
])

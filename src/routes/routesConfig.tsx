import { createBrowserRouter } from 'react-router-dom'

//Components
import App from '@/App'
import { Home } from '@/pages/home/Home'
import { Movies } from '@/pages/movies/Movies'
import { Search } from '@/pages/search/Search'
import { Shows } from '@/pages/shows/Shows'

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
				path: '/shows',
				element: <Shows />,
			},
			{
				path: '/search',
				element: <Search />,
			},
		],
	},
])

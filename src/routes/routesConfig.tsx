import { createBrowserRouter } from 'react-router-dom'

//Components
import App from '@/App'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <div>Home Page</div>,
			},
			{
				path: '/movies',
				element: <div>Movies Page</div>,
			},
			{
				path: '/shows',
				element: <div>Shows Page</div>,
			},
			{
				path: '/search',
				element: <div>Search</div>,
			},
		],
	},
])

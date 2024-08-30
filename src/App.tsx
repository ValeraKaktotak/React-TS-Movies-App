import { Layout } from '@/layouts/Layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
	return (
		<>
			<Layout>
				<Outlet />
			</Layout>
		</>
	)
}

export default App

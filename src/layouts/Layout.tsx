import { type FC } from 'react'

//Components
import { Navbar } from '@/components/Navbar'

type ILayout = {
	children: React.ReactNode
}

export const Layout: FC<ILayout> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

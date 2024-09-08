import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

//Routes
import { router } from '@/routes/routesConfig'

//Context
import { AuthProvider } from './context/AuthProvider'

//Styles
import '@/index.css'
import theme from '@/theme/theme'

createRoot(document.getElementById('root')!).render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ChakraProvider>
	</>
)

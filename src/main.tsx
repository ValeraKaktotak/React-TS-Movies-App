import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

//Routes
import { router } from '@/routes/routesConfig'

//Styles
import '@/index.css'
import theme from '@/theme/theme'

createRoot(document.getElementById('root')!).render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraProvider>
	</>
)

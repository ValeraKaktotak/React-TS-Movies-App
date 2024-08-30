import App from '@/App.tsx'
import '@/index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import theme from '../theme.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</StrictMode>
)

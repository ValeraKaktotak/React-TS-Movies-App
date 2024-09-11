import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
}

const styles = {
	global: (props: StyleFunctionProps | Record<string, never>) => ({
		body: {
			bg: mode(
				props.theme.semanticTokens.colors['chakra-body-bg']._light,
				'blackAlpha.900'
			)(props),
		},
	}),
}

const theme = extendTheme({ config, styles })

export default theme

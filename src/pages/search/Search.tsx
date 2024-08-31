import { Container, Heading } from '@chakra-ui/react'
import type { FC } from 'react'

export const Search: FC = () => {
	return (
		<Container maxW={'container.xl'}>
			<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
				Search
			</Heading>
		</Container>
	)
}

import { Container, Heading } from '@chakra-ui/react'
import type { FC } from 'react'

export const Shows: FC = () => {
	return (
		<Container maxW={'container.xl'}>
			<Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
				Discover TV Shows
			</Heading>
		</Container>
	)
}

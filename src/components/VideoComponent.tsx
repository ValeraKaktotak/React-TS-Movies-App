import { Box } from '@chakra-ui/react'
import type { FC } from 'react'

interface IVideoComponent {
	id: string
	small?: boolean
}

export const VideoComponent: FC<IVideoComponent> = ({ id, small }) => {
	if (id === 'N/F') {
		return <Box>Video is not found</Box>
	}
	return (
		<iframe
			width='100%'
			height={small ? '150' : '500'}
			src={`https://www.youtube.com/embed/${id}`}
			title='YouTube video player'
			allowFullScreen
		></iframe>
	)
}

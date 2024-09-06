import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState, type FC } from 'react'

interface IPagination {
	setActivePage: React.Dispatch<React.SetStateAction<number>>
	activePage: number
	totalPages: number
}

export const Pagination: FC<IPagination> = ({
	activePage,
	setActivePage,
	totalPages,
}) => {
	const [inputValue, setInputValue] = useState<number>(activePage)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(Number(e.currentTarget.value))
	}

	return (
		<>
			<Flex gap={'2'} alignItems={'center'}>
				<Flex gap={'2'} maxW={'250px'} my='10'>
					<Button
						onClick={() => setActivePage(activePage - 1)}
						isDisabled={activePage === 1}
					>
						Prev
					</Button>
					<Button
						onClick={() => setActivePage(activePage + 1)}
						isDisabled={activePage === totalPages}
					>
						Next
					</Button>
				</Flex>
				<Flex gap='1'>
					<Text>{activePage}</Text>
					<Text>of</Text>
					<Text>{totalPages}</Text>
				</Flex>
			</Flex>
			<Flex gap='1' mb={10}>
				<Input
					placeholder='Enter yours page'
					onChange={handleChange}
					maxWidth={'250px'}
				/>
				<Button onClick={() => setActivePage(inputValue)}>Enter</Button>
			</Flex>
		</>
	)
}

export const resolveRatingColor = (
	rating: number
): 'green.400' | 'orange.400' | 'red.400' => {
	if (rating >= 7) {
		return 'green.400'
	} else if (rating >= 5) {
		return 'orange.400'
	} else {
		return 'red.400'
	}
}

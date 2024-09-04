export interface ITrending {
	page: number
	results: ITrendingResult[]
	total_pages: number
	total_results: number
}
export interface ITrendingResult {
	backdrop_path: string
	id: number
	title?: string
	original_title?: string
	overview: string
	poster_path: string
	media_type: string
	adult: boolean
	original_language: string
	genre_ids: number[]
	popularity: number
	release_date?: string
	video?: boolean
	vote_average: number
	vote_count: number
	name?: string
	original_name?: string
	first_air_date?: string
	origin_country?: string[]
}

export interface IError {
	Error: string
}

// MOVIES AND SERIES DETAIL FETCH

export interface IMovieDetail {
	adult: boolean
	backdrop_path: string
	belongs_to_collection?: any
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: Productioncompany[]
	production_countries: Productioncountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: Spokenlanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface ISeriesDetail {
	adult: boolean
	backdrop_path: string
	created_by: Createdby[]
	episode_run_time: any[]
	first_air_date: string
	genres: Genre[]
	homepage: string
	id: number
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: Lastepisodetoair
	name: string
	next_episode_to_air?: any
	networks: Network[]
	number_of_episodes: number
	number_of_seasons: number
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: Productioncompany[]
	production_countries: Productioncountry[]
	seasons: Season[]
	spoken_languages: Spokenlanguage[]
	status: string
	tagline: string
	type: string
	vote_average: number
	vote_count: number
}
interface Spokenlanguage {
	english_name: string
	iso_639_1: string
	name: string
}
interface Season {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path: string
	season_number: number
	vote_average: number
}
interface Productioncountry {
	iso_3166_1: string
	name: string
}
interface Productioncompany {
	id: number
	logo_path?: string
	name: string
	origin_country: string
}
interface Network {
	id: number
	logo_path: string
	name: string
	origin_country: string
}
interface Lastepisodetoair {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path: string
}
interface Genre {
	id: number
	name: string
}
interface Createdby {
	id: number
	credit_id: string
	name: string
	original_name: string
	gender: number
	profile_path: string
}

// CREDITS
export interface ICredits {
	id: number
	cast: ICreditsCast[]
	crew: ICreditsCrew[]
}
interface ICreditsCrew {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
	credit_id: string
	department: string
	job: string
}
interface ICreditsCast {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string
	cast_id: number
	character: string
	credit_id: string
	order: number
}

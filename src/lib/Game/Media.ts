type Media =
	| {
			title: string;
			tmdbID: number;
			mediaType: 'movie' | 'tv';
			posterPath: string;
	  }
	| undefined;

export default Media;

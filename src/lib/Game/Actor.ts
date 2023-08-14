type Actor =
	| {
			name: string;
			profile_path: string;
			tmdbID: number;
	  }
	| undefined;

export default Actor;

export type Profile = {
	content: string;
	title: string;
	subtitle: string;
	socials: {
		github: string;
		x: string;
	};
};

export interface IProfileRepository {
	getProfile(): Promise<Profile>;
}

interface YoutubeProps {
	id: string;
}

export const Youtube = ({ id }: YoutubeProps) => {
	return (
		<iframe
			width="800"
			height="450"
			src={`https://www.youtube.com/embed/${id}`}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			style={{
				display: "block",
				width: "100%",
				aspectRatio: "16/9",
				height: "auto",
				border: "none",
			}}
		/>
	);
};

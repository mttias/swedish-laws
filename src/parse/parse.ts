export const parse = {
	title,
};

export function title(data: string): string | null {
	const m = data.match(/<h1>(.*?)<\/h1>/);

	return m ? m[1] : null;
}

export const parse = {
	title,
	sfs: (v: string) => v.match(/SFS-nummer ·[\s\n\r]+(.*?)\s*[·]/)?.at(1),
};

export function title(data: string): string | null {
	const m = data.match(/<h1>(.*?)<\/h1>/);

	return m ? m[1] : null;
}

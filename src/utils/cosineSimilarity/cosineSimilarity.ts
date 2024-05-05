export function cosineSimilarity(a: number[], b: number[]) {
	const dot = a.reduce((acc, cur, i) => acc + cur * b[i], 0);

	const magA = Math.sqrt(a.reduce((acc, cur) => acc + cur ** 2, 0));
	const magB = Math.sqrt(b.reduce((acc, cur) => acc + cur ** 2, 0));

	return dot / (magA * magB);
}

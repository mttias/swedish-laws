// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const size = (response: any) =>
	`Size: ${Math.round(
		new TextEncoder().encode(JSON.stringify(response.data)).length / 1024,
	)} kb`;

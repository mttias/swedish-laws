import * as fs from "node:fs/promises";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function toJson(data: any, path = "./data.json") {
	await fs.writeFile(path, JSON.stringify(data, null, 2));

	console.log(`Data has been written to ${path}`);
}

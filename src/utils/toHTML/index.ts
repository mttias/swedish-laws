import * as fs from "node:fs/promises";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function toHTML(data: any, path = "./data.html") {
	await fs.writeFile(path, data);
	console.log(`Data has been written to ${path}`);
}

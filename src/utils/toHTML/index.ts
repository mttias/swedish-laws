import * as fs from "node:fs/promises";
import path from "node:path";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function toHTML(data: any, file = "data.html"): Promise<void> {
	await fs.writeFile(
		path.resolve(__dirname, "..", "..", "..", "cache", file),
		data,
	);
	console.log(`Data has been written to ${file}`);
}

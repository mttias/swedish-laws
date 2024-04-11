import * as fs from "node:fs/promises";
import path from "node:path";

export async function fromHTML(filePath: string): Promise<string> {
	const resolved = path.resolve(__dirname, filePath);

	console.log({ resolved });
	return await fs.readFile(resolved, "utf-8");
}

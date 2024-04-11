import axios from "axios";
import { toHTML } from "../toHTML";
import { parse } from "../../parse/parse";
import * as fs from "node:fs/promises";
import path from "node:path";

const getUrl = (id: number | string) =>
	`https://rkrattsbaser.gov.se/sfst?fritext=&upph=false&post_id=${id}`;

export async function cachedRequest(url: string) {
	const urlId = url.split("post_id=")[1];

	const cache = await fs.readdir(
		path.resolve(__dirname, "..", "..", "..", "cache"),
	);

	if (cache.includes(`${urlId}.xml`)) {
		const data = await fs.readFile(`cache/${urlId}.xml`, "utf8");

		const tag = parse.title(data);

		console.log(tag);

		return;
	}

	const response = await axios.get(url);

	const data = response.data;

	await toHTML(data, `${urlId}.xml`);
}

export async function cachedRequestWithId(id: number | string) {
	await cachedRequest(getUrl(id));
}

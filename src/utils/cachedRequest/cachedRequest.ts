import axios from "axios";
import { toHTML } from "../toHTML";
import { parse } from "../../parse/parse";
import * as fs from "node:fs/promises";
import path from "node:path";

import OpenAI from "openai";

const openai = new OpenAI();

const getUrl = (id: number | string) =>
	`https://rkrattsbaser.gov.se/sfst?fritext=&upph=false&post_id=${id}`;

export async function cachedRequest(url: string) {
	const urlId = url.split("post_id=")[1];

	const cache = await fs.readdir(
		path.resolve(__dirname, "..", "..", "..", "cache"),
	);

	if (cache.includes(`${urlId}.xml`)) {
		const data = await fs.readFile(`cache/${urlId}.xml`, "utf8");

		const res = parse(data);

		if (!res) {
			return;
		}
		const embedded = await embed(res);

		const { body, embedding, ...rest } = embedded;

		void body;
		void embedding;

		console.log({ ...rest });

		return;
	}

	const response = await axios.get(url);

	const data = response.data;

	await toHTML(data, `${urlId}.xml`);
}

export async function cachedRequestWithId(id: number | string) {
	await cachedRequest(getUrl(id));
}

export async function embed(data: {
	title: string;
	sfs: string;
	department: string | null;
	issueDate: string | null;
	enforceDate: string | null;
	body: string;
}) {
	const embedding = await cacheEmbedding(data.sfs, data.body);

	return { ...data, embedding: embedding };
}

export async function cacheEmbedding(
	key: string,
	data: string,
): Promise<OpenAI.Embeddings.Embedding[][]> {
	const cacheKey = key.replace(/[^1-9]/gi, "");

	const cacheDir = await fs.readdir(
		path.resolve(__dirname, "..", "..", "..", "cache", "embeddings"),
	);

	if (cacheDir.includes(`${cacheKey}.json`)) {
		const data = await fs.readFile(`cache/embeddings/${cacheKey}.json`, "utf8");

		return JSON.parse(data);
	}

	const chunks: string[] = [];

	for (let i = 0; i < data.length; i += 1000) {
		chunks.push(data.substring(i, i + 1000));
	}

	const features = [];

	for (const chunk of chunks) {
		features.push(
			(
				await openai.embeddings.create({
					model: "text-embedding-3-small",
					input: chunk,
					encoding_format: "float",
				})
			).data,
		);
	}

	await fs.writeFile(
		`cache/embeddings/${cacheKey}.json`,
		JSON.stringify(features),
		"utf8",
	);

	return features;
}

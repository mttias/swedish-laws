import * as fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { cosineSimilarity } from "./src/utils/cosineSimilarity/cosineSimilarity";

const openai = new OpenAI();

const userInput = prompt("Enter a string to embed: ");

const directory = await fs.readdir(path.resolve(__dirname, "data"));

const index = [];

for (const file of directory) {
	const data = await fs.readFile(`data/${file}`, "utf8");

	const json: {
		title: string;
		embedding: {
			object: string;
			index: number;
			embedding: number[];
		}[][];
	} = JSON.parse(data);

	index.push({
		title: json.title,
		embedding: json.embedding.flat(),
	});
}

const userInputEmbedding = (
	await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: userInput ?? "",
		encoding_format: "float",
	})
).data;

const unsorted = [];

for (const item of index) {
	const embeddings = item.embedding.map((e) => e.embedding);

	const highestSimilarity = Math.max(
		...embeddings.map((e) =>
			cosineSimilarity(e, userInputEmbedding.at(0)?.embedding ?? []),
		),
	);

	unsorted.push({
		title: item.title,
		similarity: highestSimilarity,
	});
}

const sorted = unsorted.sort((a, b) => b.similarity - a.similarity);

console.log("Sorted by similarity:");
console.log(
	sorted
		.slice(0, 5)
		.map((s) => `${s.title} - ${s.similarity}`)
		.join("\n"),
);

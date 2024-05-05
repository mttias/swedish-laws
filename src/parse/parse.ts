import { z } from "zod";
import { toJson } from "../utils/toJson/toJson";

const document = z.object({
	title: z.string(),
	sfs: z.string(),
	department: z.string().nullable(),
	issueDate: z.string().nullable(),
	enforceDate: z.string().nullable(),
	body: z.string(),
});

export const parse = (html: string) => {
	const cleaned = clean(html);
	const res = {
		title: cleaned.match(/nner-box">\s*<span class="bold">(.*)<\/span>/)?.at(1),
		sfs: cleaned.match(/SFS-nummer ·[\s\n\r]+(.*?)\s*[·]/)?.at(1),
		department: cleaned.match(/Departement:<\/span>\s+(.*)/)?.at(1) ?? null,
		issueDate: cleaned.match(/Utfärdad:<\/span>\s+(.*)/)?.at(1) ?? null,
		enforceDate: cleaned.match(/Ikraft:<\/span>\s+(.*)/)?.at(1) ?? null,
		body: extractBodyText(cleaned),
	};

	const result = document.safeParse(res);

	if (!result.success) {
		toJson(cleaned, "logs/errors/error.json");
		return;
	}

	return result.data;
};

function clean(data: string) {
	return data
		.replace(/&#246;/g, "ö")
		.replace(/&#228;/g, "ä")
		.replace(/&#229;/g, "å");
}

function extractBodyText(html: string) {
	const regex =
		/<div\s+class="[^"]*result-box-text body-text[^"]*">(.*?)<\/div>/s;
	const matches = regex.exec(html);
	return matches ? matches[1] : "";
}

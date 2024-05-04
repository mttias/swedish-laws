import { describe, it, expect } from "bun:test";
import { fromHTML } from "../src/utils/fromHTML/fromHTML";
import { parse } from "../src/parse/parse";

describe("fromHTML", () => {
	it("should return the content of the file", async () => {
		const content = await fromHTML("parse.test.xml");
		const parsed = parse(content);

		expect(parsed?.sfs).toBe("2024:199");
	});
});

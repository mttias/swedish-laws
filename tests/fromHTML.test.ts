import { describe, it, expect } from "bun:test";
import { fromHTML } from "../src/utils/fromHTML/fromHTML";

describe("fromHTML", () => {
	it("should return the content of the file", async () => {
		const content = await fromHTML("fromHTML.test.html");
		expect(content).toBe("Hello, world!");
	});
});

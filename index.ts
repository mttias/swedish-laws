import * as fs from "node:fs/promises";

import { parse } from "./src/parse/parse";
import {
	cachedRequestWithId,
	embed,
} from "./src/utils/cachedRequest/cachedRequest";

for (let i = 0; i < 2000; i++) {
	const data = await cachedRequestWithId(i);

	const res = parse(data);

	if (!res) {
		continue;
	}

	const embedded = await embed(res);

	await fs.writeFile(
		`data/${res.sfs.replace(/[^1-9]/gi, "")}.json`,
		JSON.stringify(embedded, null, 2),
	);
}

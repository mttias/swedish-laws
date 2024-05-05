import { cachedRequestWithId } from "./src/utils/cachedRequest/cachedRequest";

for (let i = 0; i < 2000; i++) {
	await cachedRequestWithId(i);
}

import { cachedRequestWithId } from "./src/utils/cachedRequest/cachedRequest";

for (let i = 0; i < 4700; i++) {
	await cachedRequestWithId(i);
}

/* import { size } from "./src/utils/size/size";
import { toHTML } from "./src/utils/toHTML";
import axios from "axios";

const url = (id: string) =>
	`https://rkrattsbaser.gov.se/sfst?fritext=&upph=false&post_id=${id}`;

const response = await axios.get(url("1"));
console.log(size(response));
await toHTML(response.data, "data.xml");
 */

import { cachedRequestWithId } from "./src/utils/cachedRequest/cachedRequest";

for (let i = 0; i < 4700; i++) {
	await cachedRequestWithId(i);
}

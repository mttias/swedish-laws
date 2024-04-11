import axios from "axios";
import { size } from "./utils/size/size";
import { toJson } from "./utils/toJson/toJson";
import { toHTML } from "./utils/toHTML";

const url = (id: string) =>
	`https://rkrattsbaser.gov.se/sfst?fritext=&upph=false&post_id=${id}`;

const response = await axios.get(url("1"));
console.log(size(response));
await toHTML(response.data, "data.xml");

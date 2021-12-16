/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import asyncRequireContext from "../src";

test("Ensure the store can determine its age.", async () => {

	const contexts = await asyncRequireContext(path.resolve("./does_not_exist"));

	console.log(contexts);

});

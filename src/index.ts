import { lstat, readdir } from "fs/promises";
import { join, resolve } from "path";

// Strong type of interface
export interface Context<Module> {
	name: string;
	path: string;
	module: Module;
}

// Function to get a context of every API in the folder.
export default async function asyncRequireContext<Module = any>(dir: string, recurse = true, pattern = /\.js$/): Promise<Context<Module>[]> {

	// Attempt to require the modules.
	try {

		// Scan directory.
		const files = await readdir(dir);

		// Initialize array of contexts.
		const contexts: Context<Module>[] = [];

		// Iterate through files.
		for (const name of files) {

			// Get path of file.
			const path = join(dir, name);

			// Get information about the files.
			const stats = await lstat(path);
			const isDirectory = stats.isDirectory();

			// If its a directory and we want to recurse...
			if (isDirectory && recurse) {

				// Push subfolder of contexts.
				contexts.push(...await asyncRequireContext<Module>(path));

				// Continue to next iteration
				continue;

			}

			// If does not match filter.
			if (!pattern.test(path)) continue;

			// Push the module to contexts.
			contexts.push(<Context<Module>>{
				name,
				path,
				module: require(resolve(path))
			});

		}

		// Return all contexts!
		return contexts;

	} catch (error: any) {

		// If the folder wasnt found, just return empty array
		if (error && error.errno === -2) return [];

		// Throw the error
		throw error;

	}

}

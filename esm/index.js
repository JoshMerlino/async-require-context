import { lstat, readdir } from "fs/promises";
import { join, resolve } from "path";
export default async function asyncRequireContext(dir, recurse = true, pattern = /\.js$/) {
    try {
        const files = await readdir(dir);
        const contexts = [];
        for (const name of files) {
            const path = join(dir, name);
            const stats = await lstat(path);
            const isDirectory = stats.isDirectory();
            if (isDirectory && recurse) {
                contexts.push(...await asyncRequireContext(path));
                continue;
            }
            if (!pattern.test(path))
                continue;
            contexts.push({
                name,
                path,
                module: require(resolve(path))
            });
        }
        return contexts;
    }
    catch (error) {
        if (error && error.errno === -2)
            return [];
        throw error;
    }
}
//# sourceMappingURL=index.js.map
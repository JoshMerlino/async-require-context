"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncRequireContext;
const promises_1 = require("fs/promises");
const path_1 = require("path");
function asyncRequireContext(dir_1) {
    return __awaiter(this, arguments, void 0, function* (dir, recurse = true, pattern = /\.js$/) {
        try {
            const files = yield (0, promises_1.readdir)(dir);
            const contexts = [];
            for (const name of files) {
                const path = (0, path_1.join)(dir, name);
                const stats = yield (0, promises_1.lstat)(path);
                const isDirectory = stats.isDirectory();
                if (isDirectory && recurse) {
                    contexts.push(...yield asyncRequireContext(path));
                    continue;
                }
                if (!pattern.test(path))
                    continue;
                contexts.push({
                    name,
                    path,
                    module: require((0, path_1.resolve)(path))
                });
            }
            return contexts;
        }
        catch (error) {
            if (error && error.errno === -2)
                return [];
            throw error;
        }
    });
}
//# sourceMappingURL=index.js.map
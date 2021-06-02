# async-require-context
[![Test CI](https://github.com/JoshMerlino/async-require-context/actions/workflows/test.yml/badge.svg)](https://github.com/JoshMerlino/async-require-context/actions/workflows/test.yml)
[![CodeQL](https://github.com/JoshMerlino/async-require-context/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/JoshMerlino/async-require-context/actions/workflows/codeql-analysis.yml)

A rewritten version of [@wilsonlewis' require-context](https://www.npmjs.com/package/require-context) package that utilizes modern technologies.

### Getting started
```bash
npm install --save async-require-context
```

```ts
import asyncRequireContext from "async-require-context";
```

### Arguments
```ts
asyncRequireContext(path, recursive, pattern);
// In TypeScript, you can specify the type that each module is expected to be.
// asyncRequireContext<Type>(path, recursive, pattern);
```

| Name | Type | Default | Description |
| - | - | - | - |
| `path` | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | *none (required)* | Specifies the path to look for modules in. |
| `recursive` | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true` | If true, will recurse through subdirectorys in path. |
| `pattern` | [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | `/\.js$/` | Specifies a filter that files must match. |

### Returns
asyncRequireContext will always return `Promise<Context>`, if your using type annotations, it will be `Promise<Context<Type>>`

The `Context` structure is:
```ts
{
	name: string, // Name of the module.
	path: string, // Full path of the module.
	module: require(module) // The module as if it was required with `require`. This may be any shape depending on if you use type annotations.
}
```
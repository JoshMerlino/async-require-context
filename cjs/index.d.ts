export interface Context<Module> {
    name: string;
    path: string;
    module: Module;
}
export default function asyncRequireContext<Module = any>(dir: string, recurse?: boolean, pattern?: RegExp): Promise<Context<Module>[]>;

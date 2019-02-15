import { join, basename } from 'path';
import { dim, magenta, cyan, green } from 'colors';
import { concat, trim, toLower, join as joinString } from 'ramda';
import { glob } from './glob';
import { GlobModuleSettings, Type, Component, Module } from './definitions';
import { getGlobModuleSettings, getGlobTypedComponentSettings } from './settings';
import * as parser from './parser';

function getSlug(...fragments: string[]): string {
    return '/' + joinString('/', fragments.map(trim).map(toLower));
}

async function createComponent(module: Module, type: Type, path: string): Promise<Component> {
    const name = basename(path);
    process.stdout.write(`- parsing ${dim(cyan(type))} ${cyan(name)}... `);

    const readmeFile = join(path, 'README.md');
    const twigFile = join(path, `${name}.twig`);
    const sassFile = join(path, `${name}.scss`);
    const typescriptFile = join(path, `${name}.ts`);

    const readme = parser.markdown(readmeFile);
    const twig = parser.twig(twigFile);
    const sass = parser.sass(sassFile);
    const typescript = parser.typescript(typescriptFile);

    const log = {
        readme: !!readme ? green : dim,
        twig: !!twig ? green : dim,
        sass: !!sass ? green : dim,
        typescript: !!typescript ? green : dim
    };

    console.log(log.readme('readme'), log.twig('twig'), log.sass('sass'), log.typescript('typescript'));

    return {
        name,
        path,
        slug: getSlug(module.slug, type, name),
        type,
        module,
        readme,
        api: {
            twig,
            sass,
            typescript
        }
    }
}

function createModule(namespace: string, path: string): Module {
    const name = basename(path);

    return {
        namespace,
        name,
        path,
        slug: getSlug(namespace, name),
    }
}

export function importModules(projectRootPath: string): Module[] {
    return getGlobModuleSettings(projectRootPath)
        .map((settings: GlobModuleSettings) => glob(settings).map((path: string) => createModule(settings.namespace, path)))
        .reduce((previous: Module[], current: Module[]): Module[] => concat(previous, current));
}

export async function importTypedComponentsForModule(module: Module, type: Type): Promise<Component[]> {
    const files = glob(getGlobTypedComponentSettings(module, type));
    return Promise.all(files.map((path: string) => createComponent(module, type, path)));
}

export async function importAllComponentsForModule(module: Module, types: Type[]): Promise<Component[]> {
    console.log('Module', dim(magenta(module.namespace)), magenta(module.name));

    const components = await Promise.all(types.map((type: Type) => importTypedComponentsForModule(module, type)));
    return Array.prototype.concat(...components);
}

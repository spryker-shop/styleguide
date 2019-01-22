import { join, basename } from 'path';
import { concat, trim, toLower, join as chain } from 'ramda';
import { glob } from './glob';
import { GlobModuleSettings, Type, Component, Module } from './definitions';
import { getGlobModuleSettings, getGlobTypedComponentSettings } from './settings';
import * as parser from './parser';

function getSlug(...fragments: string[]): string {
    return chain('/', fragments.map(trim).map(toLower));
}

async function createComponent(module: Module, type: Type, path: string): Promise<Component> {
    const name = basename(path);
    const readmeFile = join(path, 'README.md');
    const twigFile = join(path, `${name}.twig`);
    const sassFile = join(path, `${name}.scss`);
    const typescriptFile = join(path, `${name}.ts`);

    const twig = parser.genericCode(twigFile);
    const sass = (await parser.sass(sassFile)) || [];
    const typescript = parser.typescript(typescriptFile);

    return {
        name,
        path,
        slug: getSlug(module.slug, type, name),
        type,
        module,
        readme: parser.markdown(readmeFile),
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

export async function importAllComponentsForModule(module: Module): Promise<Component[]> {
    return [
        ...await importTypedComponentsForModule(module, Type.Atom),
        ...await importTypedComponentsForModule(module, Type.Molecule),
        ...await importTypedComponentsForModule(module, Type.Organism),
        ...await importTypedComponentsForModule(module, Type.Template),
        ...await importTypedComponentsForModule(module, Type.View)
    ]
}

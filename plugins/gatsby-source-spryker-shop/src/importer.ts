import { join, basename } from 'path';
import { concat, trim, toLower, join as chain } from 'ramda';
import { glob } from './glob';
import { GlobModuleSettings, Type, Component, Module } from './definitions';
import { getGlobModuleSettings, getGlobTypedComponentSettings } from './settings';
import * as parser from './parser';

function getSlug(...fragments: string[]): string {
    return chain('/', fragments.map(trim).map(toLower));
}

function createComponent(module: Module, type: Type, path: string): Component {
    const name = basename(path);
    const readmeFile = join(path, 'README.md');
    const twigFile = join(path, `${name}.twig`);
    const sassFile = join(path, `${name}.scss`);
    const typescriptFile = join(path, `${name}.ts`);

    return {
        name,
        path,
        slug: getSlug(module.slug, type, name),
        type,
        module,
        readme: parser.markdown(readmeFile),
        api: {
            twig: parser.genericCode(twigFile),
            sass: parser.genericCode(sassFile),
            typescript: parser.typescript(typescriptFile)
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

export function importTypedComponentsForModule(module: Module, type: Type): Component[] {
    return glob(getGlobTypedComponentSettings(module, type)).map((path: string) => createComponent(module, type, path));
}

export function importAllComponentsForModule(module: Module): Component[] {
    return [
        ...importTypedComponentsForModule(module, Type.Atom),
        ...importTypedComponentsForModule(module, Type.Molecule),
        ...importTypedComponentsForModule(module, Type.Organism),
        ...importTypedComponentsForModule(module, Type.Template),
        ...importTypedComponentsForModule(module, Type.View)
    ]
}

import { readFileSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { groupBy, mapObjIndexed } from 'ramda';
import { Settings } from './settings';
import { find } from './find';

export enum Type {
    Atom,
    Molecule,
    Organism,
    Template,
    View
}

export interface Info {
    name: string
    path: string
    url: string
    type: Type
    module: string
    description: string
}

let registry: Info[] = [];
const groupByType = groupBy((info: Info) => Type[info.type]);
const groupByModule = groupBy((info: Info) => info.module);
const groupModulesByType = (infos: Info[]) => groupByType(infos);

function toInfo(path: string, type: Type): Info {
    const name = basename(path);
    const readmeFile = join(path, 'README.md');
    const url = path;
    let module = basename(join(path, '../../../../../'));
    let description = '';

    if (type === Type.Template || type === Type.View) {
        module = basename(join(path, '../../../../'));
    }

    if (existsSync(readmeFile)) {
        description = <string>readFileSync(readmeFile, 'utf8');
    }

    return { name, path, url, type, module, description }
}

export function populate(settings: Settings): void {
    registry = [
        ...find(settings.find.atoms).map((path: string) => toInfo(path, Type.Atom)),
        ...find(settings.find.molecules).map((path: string) => toInfo(path, Type.Molecule)),
        ...find(settings.find.organisms).map((path: string) => toInfo(path, Type.Organism)),
        ...find(settings.find.templates).map((path: string) => toInfo(path, Type.Template)),
        ...find(settings.find.views).map((path: string) => toInfo(path, Type.View))
    ];
}

export function getByType() {
    return groupByType(registry);
}

export function getByModule() {
    return mapObjIndexed(groupModulesByType, groupByModule(registry));
}

import { sync as fastGlob } from 'fast-glob';
import { GlobSettings } from './definitions';
import { GlobDefaultOptions } from './settings';

export function glob(settings: GlobSettings): string[] {
    return settings.dirs.reduce((results, cwd) => [
        ...results, ...fastGlob(settings.patterns, { ...GlobDefaultOptions, ...settings.options, cwd })
    ], []);
}

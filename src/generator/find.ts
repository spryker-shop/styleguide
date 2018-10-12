import { sync as fastGlob } from 'fast-glob';

export interface Settings {
    dirs: string[]
    patterns: string[]
    options?: any
}

const defaultOptions = {
    followSymlinkedDirectories: false,
    absolute: true,
    onlyFiles: false,
    onlyDirectories: true
}

export function find(settings: Settings): string[] {
    return settings.dirs.reduce((results, cwd) => [
        ...results, ...fastGlob(settings.patterns, { ...defaultOptions, ...settings.options, cwd })
    ], []);
}

import { existsSync } from 'fs';
import { parse as parseMarkdown } from './parsers/markdown';
import { parse as parseGenericCode } from './parsers/generic-code';
import { parse as parseSass } from './parsers/sass';
import { parse as parseTypescript, Api as TypescriptApi } from './parsers/typescript';
import { Api } from './definitions';

export function markdown(file: string): string {
    if (!existsSync(file)) {
        return '';
    }

    return parseMarkdown(file);
}

export function genericCode(file: string): Api[] {
    if (!existsSync(file)) {
        return [];
    }

    return <Api[]>parseGenericCode(file);
}

export async function sass(file: string): Promise<any> {
    if (!existsSync(file)) {
        return null;
    }

    return parseSass(file);
}

export function typescript(file: string): TypescriptApi {
    if (!existsSync(file)) {
        return null;
    }

    return parseTypescript(file);
}

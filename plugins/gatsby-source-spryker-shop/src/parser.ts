import { existsSync } from 'fs';
import { parse as parseMarkdown } from './parsers/markdown';
import { parse as parseTwig } from './parsers/twig';
import { parse as parseSass } from './parsers/sass';
import { parse as parseTypescript, Api as TypescriptApi } from './parsers/typescript';

export function markdown(file: string): string {
    if (!existsSync(file)) {
        return null;
    }

    try {
        return parseMarkdown(file);
    } catch (err) {
        console.error('Markdown parser error:', file);
        console.error(err);
        return null;
    }
}

export function twig(file: string): any {
    if (!existsSync(file)) {
        return null;
    }

    try {
        return parseTwig(file);
    } catch (err) {
        console.error('Twig parser error:', file);
        console.error(err);
        return null;
    }
}

export function sass(file: string): any {
    if (!existsSync(file)) {
        return null;
    }

    try {
        return parseSass(file);
    } catch (err) {
        console.error('Sass parser error:', file);
        console.error(err);
        return null;
    }
}

export function typescript(file: string): TypescriptApi {
    if (!existsSync(file)) {
        return null;
    }

    try {
        return parseTypescript(file);
    } catch (err) {
        console.error('Typescript parser error:', file);
        console.error(err);
        return null;
    }
}

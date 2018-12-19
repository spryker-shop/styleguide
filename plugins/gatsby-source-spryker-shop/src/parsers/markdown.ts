import { readFileSync } from 'fs';
import * as showdown from 'showdown';

const markdownConverter = new showdown.Converter();

export function parse(file: string): string {
    return markdownConverter.makeHtml(readFileSync(file, 'utf8'));
}

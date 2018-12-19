import { readFileSync } from 'fs';
import * as parseComments from 'comment-parser';
import { Api } from '../definitions';

export function parse(file: string): Api[] {
    return <Api[]>parseComments(readFileSync(file, 'utf8'));
}

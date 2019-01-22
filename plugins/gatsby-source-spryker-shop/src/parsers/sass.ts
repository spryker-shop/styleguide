import { parse as parseSass } from 'sassdoc';

export async function parse(file: string): Promise<any> {
    return parseSass(file, { verbose: false });
}

import { join } from 'path';
import { Settings as FindSettings } from './find';

const defaultIgnore = [
    '!data',
    '!deploy',
    '!node_modules',
    '!public',
    '!test'
]

export interface Settings {
    find: {
        atoms: FindSettings,
        molecules: FindSettings,
        organisms: FindSettings,
        templates: FindSettings,
        views: FindSettings
    }
}

export function getSettings(projectDir: string): Settings {
    const dirs = [
        join(projectDir, 'vendor/spryker-shop'),
        join(projectDir, 'vendor/spryker/spryker-shop/Bundles')
    ];

    return {
        find: {
            atoms: {
                dirs: dirs,
                patterns: [
                    `**/Theme/default/components/atoms/*`,
                    ...defaultIgnore
                ]
            },
            molecules: {
                dirs: dirs,
                patterns: [
                    `**/Theme/default/components/molecules/*`,
                    ...defaultIgnore
                ]
            },
            organisms: {
                dirs: dirs,
                patterns: [
                    `**/Theme/default/components/organisms/*`,
                    ...defaultIgnore
                ]
            },
            templates: {
                dirs: dirs,
                patterns: [
                    `**/Theme/default/templates/*`,
                    ...defaultIgnore
                ]
            },
            views: {
                dirs: dirs,
                patterns: [
                    `**/Theme/default/views/*`,
                    ...defaultIgnore
                ]
            }
        }
    }
}

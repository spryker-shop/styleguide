import { join } from 'path';
import { GlobSettings, GlobModuleSettings, Module, Type } from './definitions';

export const GlobDefaultOptions = {
    followSymlinkedDirectories: false,
    absolute: true,
    onlyFiles: false,
    onlyDirectories: true
}

export const TypePatterns = {
    [Type.Atom]: [
        '**/Theme/default/components/atoms/*'
    ],
    [Type.Molecule]: [
        '**/Theme/default/components/molecules/*'
    ],
    [Type.Organism]: [
        '**/Theme/default/components/organisms/*'
    ],
    [Type.Template]: [
        '**/Theme/default/templates/*'
    ],
    [Type.View]: [
        '**/Theme/default/views/*'
    ]
}

export const getGlobModuleSettings = (projectRootPath: string): GlobModuleSettings[] => [
    {
        namespace: 'SprykerShop',
        dirs: [
            join(projectRootPath, 'vendor/spryker-shop'),
            join(projectRootPath, 'vendor/spryker/spryker-shop/Bundles')
        ],
        patterns: [
            '*/src/SprykerShop/Yves/*'
        ]
    }
]

export const getGlobTypedComponentSettings = (module: Module, type: Type): GlobSettings => ({
    dirs: [
        module.path
    ],
    patterns: [
        ...TypePatterns[type]
    ]
})

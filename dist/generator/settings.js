"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var defaultIgnore = [
    '!data',
    '!deploy',
    '!node_modules',
    '!public',
    '!test'
];
function getSettings(projectDir) {
    var dirs = [
        path_1.join(projectDir, 'vendor/spryker-shop'),
        path_1.join(projectDir, 'vendor/spryker/spryker-shop/Bundles')
    ];
    return {
        find: {
            atoms: {
                dirs: dirs,
                patterns: [
                    "**/Theme/default/components/atoms/*"
                ].concat(defaultIgnore)
            },
            molecules: {
                dirs: dirs,
                patterns: [
                    "**/Theme/default/components/molecules/*"
                ].concat(defaultIgnore)
            },
            organisms: {
                dirs: dirs,
                patterns: [
                    "**/Theme/default/components/organisms/*"
                ].concat(defaultIgnore)
            },
            templates: {
                dirs: dirs,
                patterns: [
                    "**/Theme/default/templates/*"
                ].concat(defaultIgnore)
            },
            views: {
                dirs: dirs,
                patterns: [
                    "**/Theme/default/views/*"
                ].concat(defaultIgnore)
            }
        }
    };
}
exports.getSettings = getSettings;
//# sourceMappingURL=settings.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var cwd = process.cwd();
var defaultDirs = [
    path_1.join(cwd, '../suite-nonsplit/project', 'vendor/spryker-shop'),
    path_1.join(cwd, '../suite-nonsplit/project', 'vendor/spryker/spryker-shop/Bundles')
];
var defaultIgnore = [
    '!data',
    '!deploy',
    '!node_modules',
    '!public',
    '!test'
];
exports.defaultSettings = {
    find: {
        atoms: {
            dirs: defaultDirs,
            patterns: [
                "**/Theme/default/components/atoms/*"
            ].concat(defaultIgnore)
        },
        molecules: {
            dirs: defaultDirs,
            patterns: [
                "**/Theme/default/components/molecules/*"
            ].concat(defaultIgnore)
        },
        organisms: {
            dirs: defaultDirs,
            patterns: [
                "**/Theme/default/components/organisms/*"
            ].concat(defaultIgnore)
        },
        templates: {
            dirs: defaultDirs,
            patterns: [
                "**/Theme/default/templates/*"
            ].concat(defaultIgnore)
        },
        views: {
            dirs: defaultDirs,
            patterns: [
                "**/Theme/default/views/*"
            ].concat(defaultIgnore)
        }
    }
};
//# sourceMappingURL=settings.js.map
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fast_glob_1 = require("fast-glob");
var defaultOptions = {
    followSymlinkedDirectories: false,
    absolute: true,
    onlyFiles: false,
    onlyDirectories: true
};
function find(settings) {
    return settings.dirs.reduce(function (results, cwd) { return results.concat(fast_glob_1.sync(settings.patterns, __assign({}, defaultOptions, settings.options, { cwd: cwd }))); }, []);
}
exports.find = find;
//# sourceMappingURL=find.js.map
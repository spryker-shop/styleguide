"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var ramda_1 = require("ramda");
var find_1 = require("./find");
var Type;
(function (Type) {
    Type[Type["Atom"] = 0] = "Atom";
    Type[Type["Molecule"] = 1] = "Molecule";
    Type[Type["Organism"] = 2] = "Organism";
    Type[Type["Template"] = 3] = "Template";
    Type[Type["View"] = 4] = "View";
})(Type = exports.Type || (exports.Type = {}));
var registry = [];
var groupByType = ramda_1.groupBy(function (info) { return Type[info.type]; });
var groupByModule = ramda_1.groupBy(function (info) { return info.module; });
var groupModulesByType = function (infos) { return groupByType(infos); };
function toInfo(path, type) {
    var name = path_1.basename(path);
    var readmeFile = path_1.join(path, 'README.md');
    var url = path;
    var module = path_1.basename(path_1.join(path, '../../../../../'));
    var description = '';
    if (type === Type.Template || type === Type.View) {
        module = path_1.basename(path_1.join(path, '../../../../'));
    }
    if (fs_1.existsSync(readmeFile)) {
        description = fs_1.readFileSync(readmeFile, 'utf8');
    }
    return { name: name, path: path, url: url, type: type, module: module, description: description };
}
function populate(settings) {
    registry = find_1.find(settings.find.atoms).map(function (path) { return toInfo(path, Type.Atom); }).concat(find_1.find(settings.find.molecules).map(function (path) { return toInfo(path, Type.Molecule); }), find_1.find(settings.find.organisms).map(function (path) { return toInfo(path, Type.Organism); }), find_1.find(settings.find.templates).map(function (path) { return toInfo(path, Type.Template); }), find_1.find(settings.find.views).map(function (path) { return toInfo(path, Type.View); }));
}
exports.populate = populate;
function getByType() {
    return groupByType(registry);
}
exports.getByType = getByType;
function getByModule() {
    return ramda_1.mapObjIndexed(groupModulesByType, groupByModule(registry));
}
exports.getByModule = getByModule;
//# sourceMappingURL=registry.js.map
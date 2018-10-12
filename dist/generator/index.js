"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var settings_1 = require("./settings");
var registry_1 = require("./registry");
var inquirer = require("inquirer");
var cwd = process.cwd();
var contentFolder = path_1.join(cwd, 'content');
inquirer
    .prompt([
    {
        type: 'string',
        name: 'projectPath',
        message: 'Where is the project (root folder) you want to generate the styleguide for?',
        default: './'
    }
])
    .then(function (answers) {
    var projectPath = answers['projectPath'];
    var projectFullPath = path_1.isAbsolute(projectPath) ? projectPath : path_1.join(cwd, projectPath);
    registry_1.populate(settings_1.getSettings(projectFullPath));
    var registry = registry_1.getByModule();
    if (!fs_1.existsSync(contentFolder)) {
        fs_1.mkdirSync(contentFolder);
    }
    Object.keys(registry_1.getByModule()).forEach(function (module) {
        var moduleFolder = path_1.join(contentFolder, module);
        if (!fs_1.existsSync(moduleFolder)) {
            fs_1.mkdirSync(moduleFolder);
        }
        Object.keys(registry[module]).forEach(function (type) {
            var typeFolder = path_1.join(moduleFolder, type);
            if (!fs_1.existsSync(typeFolder)) {
                fs_1.mkdirSync(typeFolder);
            }
            registry[module][type].forEach(function (info) {
                var infoFile = path_1.join(typeFolder, info.name + ".md");
                fs_1.writeFileSync(infoFile, info.description);
            });
        });
    });
    console.log('Content generated. Type "npm run start" to navigate the styleguide.');
});
//# sourceMappingURL=index.js.map
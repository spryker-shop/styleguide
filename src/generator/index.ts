import { existsSync, unlinkSync, mkdirSync, writeFileSync } from 'fs';
import { join, isAbsolute } from 'path';
import { getSettings } from './settings';
import { Info, populate, getByType, getByModule } from './registry';
import * as inquirer from 'inquirer';

const cwd = process.cwd();
const contentFolder = join(cwd, 'content');

inquirer
    .prompt([
        {
            type: 'string',
            name: 'projectPath',
            message: 'Where is the project (root folder) you want to generate the styleguide for?',
            default: './'
        }
    ])
    .then(answers => {
        const projectPath = answers['projectPath'];
        const projectFullPath = isAbsolute(projectPath) ? projectPath : join(cwd, projectPath);

        populate(getSettings(projectFullPath));
        const registry = getByModule();

        if (!existsSync(contentFolder)) {
            mkdirSync(contentFolder);
        }

        Object.keys(getByModule()).forEach((module: string) => {
            const moduleFolder = join(contentFolder, module);

            if (!existsSync(moduleFolder)) {
                mkdirSync(moduleFolder);
            }

            Object.keys(registry[module]).forEach((type: string) => {
                const typeFolder = join(moduleFolder, type);

                if (!existsSync(typeFolder)) {
                    mkdirSync(typeFolder);
                }

                registry[module][type].forEach((info: Info) => {
                    const infoFile = join(typeFolder, `${info.name}.md`);
                    writeFileSync(infoFile, info.description);
                })
            })
        });

        console.log('Content generated. Type "npm run start" to navigate the styleguide.');
    });

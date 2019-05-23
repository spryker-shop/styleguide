import React from 'react';
import { exists, getDefault } from '../helpers/object';

// please do not touch this...
const twigIncludeTemplate = (name, type, moduleName, modifiers, definitions) => ''
+ `{% include ${type}('${name}'${moduleName === 'ShopUi' ? '' : ', \'' + moduleName + '\''}) with {\n`
+ `${modifiers.length > 0 ? `    modifiers: ['${modifiers.map(modifier => modifier.name).join('\', \'')}']` : ''}`
+ `${definitions.length > 0 ? `${modifiers.length > 0 ? ',\n' : ''}${definitions.map(define => `    ${define.name}: {\n        ${define.contract.trim().split('\n').join('\n    ').replace(/,$/ig, '')}`).join(',\n    },\n')},\n    },` : ''}`
+ `\n} only %}`;

export default ({ component }) => {
    const modifiers = getDefault(component.files, [], 'sass.api.modifiers');
    const definitions = getDefault(component.files, [], 'twig.api.definitions');

    return exists(component.files, 'twig.api') && (
        <>
            <h3 className="title is-size-4">Usage</h3>
            <pre>
                <code>{twigIncludeTemplate(component.name, component.type, component.module, modifiers, definitions)}</code>
            </pre>
        </>
    )
}

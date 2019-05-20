import React from 'react';
import { exists, getDefault } from '../helpers/object';

// please do not touch this...
const twigIncludeTemplate = (name, type, moduleName, modifiers, defines) => ''
+ `{% include ${type}('${name}'${moduleName === 'ShopUi' ? '' : ', \'' + moduleName + '\''}) with {\n`
+ `${modifiers.length > 0 ? `    modifiers: ['${modifiers.map(modifier => modifier.name).join('\', \'')}']` : ''}`
+ `${defines.length > 0 ? `${modifiers.length > 0 ? ',\n' : ''}${defines.map(define => `    ${define.name}: {\n        ${define.contract.trim().split('\n').join('\n    ').replace(/,$/ig, '')}`).join(',\n    },\n')},\n    },` : ''}`
+ `\n} only %}`;

export default ({ component }) => {
    const modifiers = getDefault(component, [], 'api.sass.modifiers');
    const defines = getDefault(component, [], 'api.twig.defines');

    return exists(component, 'api.twig') && (
        <>
            <h3 className="title is-size-4">Usage</h3>
            <pre>
                <code>{twigIncludeTemplate(component.name, component.type, component.module.name, modifiers, defines)}</code>
            </pre>
        </>
    )
}

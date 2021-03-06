import React from 'react';
// import MissingResourceMessage from '../missing-resource-message';
import { exists } from '../../helpers/object';

export default ({ api }) => exists(api) && (
    <div className='content'>
        {exists(api, 'variables') && (
            <>
                <h6>Variables</h6>
                <ul>
                    {api.variables.map(variable => (
                        <li key={variable.name}>
                            <code>${variable.name}: {variable.value}</code>
                        </li>
                    ))}
                </ul>
            </>
        )}

        {exists(api, 'mixins') && (
            <>
                <h6>Mixins</h6>
                <ul>
                    {api.mixins.map(mixin => (
                        <li key={mixin.name}>
                            <code>{mixin.name}(
                                    {exists(mixin, 'arguments') &&
                                    mixin.arguments.map(argument => `$${argument.name}${argument.value ? ': ' + argument.value : ''}`)
                                }
                                )</code>
                        </li>
                    ))}
                </ul>
            </>
        )}

        {exists(api, 'modifiers') && (
            <>
                <h6>Modifiers</h6>
                <ul>
                    {api.modifiers.map(modifier => (
                        <li key={modifier.name}>{modifier.name}</li>
                    ))}
                </ul>
            </>
        )}
    </div>
)

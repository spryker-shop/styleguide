import React from 'react';
import { exists } from '../../helpers/object';

export default ({ api }) => (
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
                                    mixin.arguments.map((argument, index, array) => {
                                        const separator = array.length > index + 1 ? ', ' : '';
                                        return `$${argument.name}${argument.value ? ': ' + argument.value + separator : ''}`
                                    })
                                })
                            </code>
                            {exists(mixin, 'comment') && (
                                <>
                                    <p>{mixin.comment.description}</p>

                                    {exists(mixin.comment, 'tags') && (
                                        <>
                                            <h6>Tags</h6>
                                            <ul>
                                                {mixin.comment.tags.map((tag, index) => (
                                                    <li key={`${tag.type}-${index}`}>
                                                        <strong>{tag.type}</strong> {tag.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </>
                            )}
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

        {exists(api, 'functions') && (
            <>
                <h6>Functions</h6>
                <ul>
                    {api.functions.map((functionItem, index) => (
                        <li key={`${functionItem.name}-${index}`}>
                            <code>{functionItem.name}(
                                {exists(functionItem, 'arguments') &&
                                    functionItem.arguments.map((argument, index, array) => {
                                        const separator = array.length > index + 1 ? ', ' : '';
                                        return `$${argument.name + separator}`
                                    })
                                })
                            </code>
                            {exists(functionItem, 'comment') && (
                                <>
                                    <p>{functionItem.comment.description}</p>

                                    {exists(functionItem.comment, 'tags') && (
                                        <>
                                            <h6>Tags</h6>
                                            <ul>
                                                {functionItem.comment.tags.map((tag, index) => (
                                                    <li key={`${tag.type}-${index}`}>
                                                        <strong>{tag.type}</strong> {tag.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </>
        )}
    </div>
)

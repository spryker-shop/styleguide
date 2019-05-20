import React from 'react';
import { exists } from '../../helpers/object';

const isPublic = (method) => method.visibility === 'public';

export default ({ api }) => exists(api) && exists(api, 'classes') && (
    <div className='content'>
        {api.classes.map((singleClass, index) => (
            <div key={`classes-${index}`}>
                {exists(singleClass, 'tags') && (
                    <>
                        <h6>Tags</h6>
                        <ul>
                            {singleClass.tags.map((tag, index) => (
                                <li key={`${tag.name}-${index}`}>
                                    <strong>{tag.name}</strong>
                                    <br />
                                    {tag.description}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {exists(singleClass, 'methods') && (
                    <>
                        <h6>Methods</h6>
                        <ul>
                            {singleClass.methods.filter(isPublic).map((method, index) => (
                                <li key={`method-${index}`}>
                                    <code>{method.visibility} {method.name}(
                                        {exists(method, 'parameters') && method.parameters.map(
                                            parameter => `${parameter.name}${parameter.isOptional ? '?' : ''}: ${parameter.type}`
                                        ).join(', ')}
                                    ): {method.returnType}</code>
                                    <br />
                                    <p>{method.description}</p>

                                    {exists(method, 'parameters') && (
                                        <>
                                            <h6>Parameters</h6>
                                            <ul>
                                                {method.parameters.map((parameter, index) => (
                                                    <li key={`parameter-${index}`}>
                                                        <code>
                                                            {parameter.isOptional ? '[' : ''}
                                                            {parameter.name}
                                                            {parameter.isOptional ? ']' : ''}
                                                            {` {${parameter.type}}`}
                                                        </code>
                                                        &nbsp;{parameter.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {exists(method, 'tags') && (
                                        <>
                                            <h6>Tags</h6>
                                            <ul>
                                                {method.tags.map((tag, index) => (
                                                    <li key={`${tag.name}-${index}`}>
                                                        <strong>{tag.name}</strong> {tag.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        ))}
    </div>
)

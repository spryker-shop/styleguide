import React from 'react';
import { exists } from '../../helpers/object';


export default ({title, list }) => (
    <>
        <h6>{title}</h6>
        <ul className="list-marked">
            {list.map((listItem, index) => (
                <li key={`method-${listItem}-${index}`}>
                    <code>{listItem.visibility} {listItem.extractAsync ? 'async' : ''} {listItem.name}(
                        {exists(listItem, 'parameters') && listItem.parameters.map(
                            parameter => `${parameter.name}${parameter.isOptional ? '?' : ''}: ${parameter.type}`
                        ).join(', ')}
                        ): {listItem.returnType}</code>
                    {exists(listItem, 'description') && (
                        <p>{listItem.description}</p>
                    )}

                    {exists(listItem, 'parameters') && (
                        <>
                            <h6>Parameters</h6>
                            <ul>
                                {listItem.parameters.map((parameter, index) => (
                                    <li key={`parameter-${listItem}-${index}`}>
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

                    {exists(listItem, 'tags') && (
                        <>
                            <h6>Tags</h6>
                            <ul>
                                {listItem.tags.map((tag, index) => (
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
)

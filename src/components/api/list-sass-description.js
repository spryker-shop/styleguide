import React from 'react';
import { exists } from '../../helpers/object';


export default ({ title, list }) => (
    <>
        <h6>{title}</h6>
        <ul className="list-marked">
            {list.map(listItem => (
                <li key={listItem.name}>
                    <code>{listItem.name}(
                        {exists(listItem, 'arguments') &&
                            listItem.arguments.map((argument, index, array) => {
                                const separator = array.length > index + 1 ? ', ' : '';
                                return `$${argument.name}${argument.value ? ': ' + argument.value : ''}${separator}`
                            })
                        })
                    </code>
                    {exists(listItem, 'comment') && (
                        <>
                            <p>{listItem.comment.description}</p>

                            {exists(listItem.comment, 'tags') && (
                                <>
                                    <h6>Tags</h6>
                                    <ul>
                                        {listItem.comment.tags.map((tag, index) => (
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
)

import React from 'react';
import { exists } from '../../helpers/object';

export default ({ api }) => (
    <div className='content'>
        {exists(api, 'definitions') && (
            <>
                <h6>Defines</h6>
                {api.definitions.map((definition, index) => (
                    <pre key={`definitions-${index}`}>
                        <code>
                            {definition.declaration}
                        </code>
                    </pre>
                ))}
            </>
        )}

        {exists(api, 'blocks') && (
            <>
                <h6>Blocks</h6>
                <ul>
                    {api.blocks.map((block, index) => (
                        <li key={`${block.name}-${index}`}>{block.name}</li>
                    ))}
                </ul>
            </>
        )}
    </div>
)

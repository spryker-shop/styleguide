import React from 'react';
import { exists } from '../../helpers/object';

export default ({ api }) => exists(api) && (
    <div className='content'>
        {exists(api, 'defines') && (
            <>
                <h6>Defines</h6>
                {api.defines.map((define, index) => (
                    <pre key={`defines-${index}`}>
                        <code>
                            {define.declaration}
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

import React from 'react';
import { exists } from '../../helpers/object';
import ListTypescriptDescription from './list-typescript-description';


export default ({ api }) => (
    <div className='content'>
        {exists(api, 'classes') && (
            api.classes.map((singleClass, index) => (
                <div key={`class-${index}`}>
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
                            <ListTypescriptDescription list={singleClass.methods}/>
                        </>
                    )}
                </div>
            ))
        )}
        {exists(api, 'functions') && (
            <>
                <h6>Functions</h6>
                <ListTypescriptDescription list={api.functions}/>
            </>
        )}
    </div>
)

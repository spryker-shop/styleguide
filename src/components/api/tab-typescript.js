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
                            <ul className="list-marked">
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
                        <ListTypescriptDescription title='Methods' list={singleClass.methods}/>
                    )}
                </div>
            ))
        )}
        {exists(api, 'functions') && (
            <ListTypescriptDescription title='Functions' list={api.functions}/>
        )}
    </div>
)

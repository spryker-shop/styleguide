import React from 'react';
import { exists } from '../../helpers/object';
import ListSassDescription from './list-sass-description';
import {CopyToClipboard} from "react-copy-to-clipboard";

export default ({ api }) => {
    const matchColor = /#(?:[0-9a-f]{2}){2,4}/img;

    return (
        <div className='content'>
            {exists(api, 'variables') && (
                <>
                    <h6>Variables</h6>
                    <ul className="list-marked">
                        {api.variables.map(variable => (
                            <li key={variable.name}>
                                {(variable.value.search(matchColor) !== -1) && (
                                    variable.value.match(matchColor).slice(/#/img).map( (color, index) => (
                                        <CopyToClipboard key={`${variable.name}-${index}`} text={color}>
                                            <button
                                                className="button is-small color-example"
                                                style={{backgroundColor: color}}
                                                title="Copy the color code">
                                            </button>
                                        </CopyToClipboard>
                                    ))
                                )}
                                <code>${variable.name}: {variable.value};</code>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {exists(api, 'mixins') && (
                <ListSassDescription title='Mixins' list={api.mixins}/>
            )}

            {exists(api, 'classes') && (
                <>
                    <h6>Classes</h6>
                    <ul className="list-marked">
                        {api.classes.map(item => (
                            <li key={item.name}>{item.name}</li>
                        ))}
                    </ul>
                </>
            )}

            {exists(api, 'modifiers') && (
                <>
                    <h6>Modifiers</h6>
                    <ul className="list-marked">
                        {api.modifiers.map(modifier => (
                            <li key={modifier.name}>{modifier.name}</li>
                        ))}
                    </ul>
                </>
            )}

            {exists(api, 'functions') && (
                <ListSassDescription title='Functions' list={api.functions}/>
            )}
        </div>
    )
}

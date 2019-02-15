import React from 'react';
import { exists } from '../helpers/object';

export default ({ resource, type, children }) => !exists(resource) && (
    <div className={`message is-${type || 'info'}`}>
        <div className="message-body">{children}</div>
    </div>
)

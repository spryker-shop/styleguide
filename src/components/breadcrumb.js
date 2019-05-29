import React from 'react';

export default ({ steps }) => (
    <nav className="breadcrumb">
        <ul>
            {steps.map((step, index) => (
                <li key={`${step}-${index}`}><span className="breadcrumb__item">{step}</span></li>
            ))}
        </ul>
    </nav>
)

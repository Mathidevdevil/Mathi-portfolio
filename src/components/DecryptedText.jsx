import React from 'react';

export default function DecryptedText({
    text,
    className = '',
    parentClassName = '',
    ...props
}) {
    return (
        <span className={parentClassName} {...props}>
            <span className={className}>
                {text}
            </span>
        </span>
    );
}

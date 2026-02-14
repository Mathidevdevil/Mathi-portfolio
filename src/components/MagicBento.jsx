import React from 'react';
import './MagicBento.css';

export const MagicBentoCard = ({
    children,
    className = '',
    style,
    ...props
}) => {
    return (
        <div
            {...props}
            className={`${className} magic-bento-card`}
            style={{ ...style, backgroundColor: style?.backgroundColor || 'transparent' }}
        >
            {children}
        </div>
    );
};

const BentoCardGrid = ({ children, className = '' }) => (
    <div className={`card-grid bento-section ${className}`}>
        {children}
    </div>
);

const MagicBento = ({
    children,
    wrapperClassName = ''
}) => {
    return (
        <BentoCardGrid className={wrapperClassName}>
            {children}
        </BentoCardGrid>
    );
};

export default MagicBento;

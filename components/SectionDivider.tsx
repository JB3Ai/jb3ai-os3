import React from 'react';

interface SectionDividerProps {
    className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <img
                src="/media/dividers/section-divider-dark-v1.jpg"
                alt=""
                loading="lazy"
                className="w-full h-auto object-cover object-center"
                style={{ objectFit: 'cover', maxHeight: '200px' }}
            />
        </div>
    );
};

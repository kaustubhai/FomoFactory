import React from 'react';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = 'border-blue-500', className }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    return (
        <div className={`animate-spin rounded-full border-t-2 border-b-2 ${className} ${color} ${sizeClasses[size]}`}></div>
    );
};

export default Loader;